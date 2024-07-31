namespace CookingApp.Services.CostCalculation
{
    using ConsoleTables;
    using Microsoft.AspNetCore.Mvc;

    public interface ICostCalculationService
    {
        Task AzureServices();

        decimal OpenAiApiServices(int userCount, int textRequestsPerMonth, int imagesCount);

        Task<decimal> StripeApiServices(decimal subPrice);

        decimal FixedPrices(string span);
    }
}
