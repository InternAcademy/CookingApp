
namespace CookingApp.Services.CostCalculation
{
    using System.Net.Http;
    using System.Text.Json;
    using System.Threading.Tasks;
    using CookingApp.Services.Stripe;
    using CookingApp.Services.CostCalculation.Azure;

    public class CostCalculatioService : ICostCalculationService
    {
        private decimal calculatedTotal;
        private readonly IStripeService stripeService;
        public CostCalculatioService(IStripeService stripeService)
        {
            this.CalculatedTotal = calculatedTotal;
            this.stripeService = stripeService;
        }

        public decimal CalculatedTotal { get; set; }

        public async Task AzureServices()
        {
            var queries = Constants.Queries;
            var estimate = new Estimate();

            using (var httpClient = new HttpClient())
            {
                foreach (var query in queries)
                {
                    string urlWithQuery = $"{Constants.apiUrl}&$filter={Uri.EscapeDataString(query)}";
                    var response = await httpClient.GetStringAsync(urlWithQuery);

                    JsonDocument jsonDocument = JsonDocument.Parse(response);
                    JsonElement root = jsonDocument.RootElement;

                    estimate.Map(root);
                }
            }

            estimate.CalculatePrices();

            this.CalculatedTotal += estimate.Result;
        }

        public decimal OpenAiApiServices(int userCount, int textRequestsPerMonth, int imagesCount)
        {
            var textProcessingRequestPrice = 0.0035m;
            var imageProcessingPrice = 0.04m;
            var openAiFee = userCount * textRequestsPerMonth * textProcessingRequestPrice + imageProcessingPrice * imagesCount;
            this.CalculatedTotal += openAiFee;
            return openAiFee;
        }

        public async Task<decimal> StripeApiServices(decimal subPrice)
        {
            var subscriptions = await stripeService.GetAllSubs();
            var stripeFeePercentage = 2.9m;
            var stripeFeeFixed = 0.30m;

            decimal stripeFee = (stripeFeePercentage * subPrice / 100) + stripeFeeFixed;
            var totalFees = subscriptions.Count() * stripeFee;
            this.CalculatedTotal += totalFees;
            return totalFees;
        }

        public decimal FixedPrices(string span)
        {
            var divider = 0;
            if (span == "yearly")
                divider = 1;
            else divider = 12;

            var azureCertificates = 81.98m;
            var appleStore = 99.00m;
            var webAppHost = 9.0m * 12;

            var calculatedPrice = (azureCertificates + appleStore + webAppHost) / divider;
            this.CalculatedTotal += calculatedPrice;
            return calculatedPrice;
        }
    }
}
