namespace CookingApp.Services.CostCalculation.Azure
{
    using CookingApp.ViewModels.Azure;
    using System.Text.Json;

    public class Estimate
    {
        private decimal result = 0;
        public List<AzureServiceModel> azureModelList = new List<AzureServiceModel>();

        public Estimate()
        {
            this.Result = result;
            this.AzureModelList = azureModelList;
        }

        public decimal Result { get; set; }
        private List<AzureServiceModel> AzureModelList { get; set; }

        public void Map(JsonElement root)
        {
            var jsonElement = this.ExtractJsonElement(root);
            var azureModel = this.MapToAzurePricingModel(jsonElement);
            this.InsertToList(azureModel);
        }

        private AzureServiceModel MapToAzurePricingModel(string? jsonString)
            => JsonSerializer.Deserialize<AzureServiceModel>(jsonString ?? default!) ?? new AzureServiceModel();

        private void InsertToList(AzureServiceModel? azureModel)
            => azureModelList.Add(azureModel ?? default!);

        private string ExtractJsonElement(JsonElement root)
            => JsonSerializer.Serialize(root.GetProperty(Constants.SearchTerm)[0],
                new JsonSerializerOptions { WriteIndented = true });

        public void CalculatePrices()
        {
            int ruCount = 400;
            int hoursPerMonth = 730;
            int gbCount = 2;
            int storageGbUsage = 10;

            foreach (var azureModel in this.AzureModelList)
            {
                var retailPrice = azureModel.RetailPrice;
                var meterName = azureModel.MeterName;
                var productName = azureModel.ProductName;

                var productTotal = productName switch
                {
                    _ when productName == Constants.CosmosDb && meterName == Constants.Meter.ReadUnits => retailPrice * ruCount * hoursPerMonth / 100,
                    _ when productName == Constants.CosmosDb && meterName == Constants.Meter.DataStored => retailPrice * gbCount,
                    _ when productName == Constants.AzureAppService => retailPrice * hoursPerMonth,
                    _ when productName == Constants.EntraId => retailPrice * hoursPerMonth,
                    _ when productName == Constants.BlockBlob && meterName == Constants.Meter.HotWrite => retailPrice * storageGbUsage,
                    _ when productName == Constants.BlockBlob && meterName == Constants.Meter.HotRead => retailPrice * storageGbUsage,
                    _ when productName == Constants.AzureDataLake && meterName == Constants.Meter.HotIterativeRead => retailPrice * storageGbUsage,
                    _ when productName == Constants.AzureDataLake && meterName == Constants.Meter.HotIterativeWrite => retailPrice * storageGbUsage,
                    _ when productName == Constants.BlockBlob && meterName == Constants.Meter.Index => retailPrice * storageGbUsage,
                    _ when productName == Constants.BlockBlob && meterName == Constants.Meter.Other => retailPrice,
                    _ => default
                };

                Result += productTotal;
            }
        }
    }
}
