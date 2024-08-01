namespace CookingApp.Controllers
{
    using CookingApp.Services.CostCalculation;
    using CookingApp.ViewModels.Api;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
#pragma warning disable 1591
    public class CostCalculatorController(ICostCalculationService costService) : ControllerBase
    {
        [HttpGet("azure-prices")]
        public async Task<IActionResult> CalculateAzureServices()
            => new ApiResponse<decimal>()
            {
                Status = 200,
                Data = await costService.AzureServices()
            };

        [HttpGet("open-ai-prices")]
        public IActionResult CalculateOpenAiServices(int userCount, int requestsPerMonth, int imagesCount)
            => new ApiResponse<decimal>()
            {
                Status = 200,
                Data = costService.OpenAiApiServices(userCount, requestsPerMonth, imagesCount)
            };

        [HttpGet("stripe-prices")]
        public async Task<IActionResult> CalculateStripeApiServices(decimal subPrice)
            => new ApiResponse<decimal>()
            {
                Status = 200,
                Data = await costService.StripeApiServices(subPrice)
            };

        [HttpGet("fixed-prices")]
        public IActionResult CalculateFixedPrices(string span)
            => new ApiResponse<string>()
            {
                Status = 200,
                Data = costService.FixedPrices(span).ToString("F2")
            };
    }
}
