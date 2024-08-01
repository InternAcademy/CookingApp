
namespace CookingApp.Services.CostCalculation
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using CookingApp.Services.Stripe;
    using CookingApp.Services.CostCalculation.Azure;
    using CookingApp.Infrastructure.Configurations.Azure;
    using Newtonsoft.Json.Linq;
#pragma warning disable 1591
    public class CostCalculatioService(IStripeService stripeService, AzureRetailPricesSettings settings) : ICostCalculationService
    {
        public async Task<decimal> AzureServices()
        {
            var queries = Constants.Queries;
            var estimate = new Estimate();

            using (var httpClient = new HttpClient())
            {
                foreach (var query in queries)
                {
                    var stringStatus = settings.Url;

                    string urlWithQuery = $"{settings.Url}&$filter={Uri.EscapeDataString(query)}";
                    var response = await httpClient.GetStringAsync(urlWithQuery);

                    JObject jsonObject = JObject.Parse(response);

                    estimate.Map(jsonObject);
                }
            }

            return estimate.CalculatePrices();
        }

        public decimal OpenAiApiServices(int userCount, int textRequestsPerMonth, int imagesCount)
        {
            var textProcessingRequestPrice = 0.0035m;
            var imageProcessingPrice = 0.04m;
            var openAiFee = userCount * textRequestsPerMonth * textProcessingRequestPrice + imageProcessingPrice * imagesCount;

            return openAiFee;
        }

        public async Task<decimal> StripeApiServices(decimal subPrice)
        {
            var subscriptions = await stripeService.GetAllSubs();
            var stripeFeePercentage = 2.9m;
            var stripeFeeFixed = 0.30m;

            decimal stripeFee = (stripeFeePercentage * subPrice / 100) + stripeFeeFixed;
            var totalFees = subscriptions.Count() * stripeFee;

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

            return calculatedPrice;
        }
    }
}
