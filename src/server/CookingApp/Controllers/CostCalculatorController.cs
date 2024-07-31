namespace CookingApp.Controllers
{
    using CookingApp.Services.CostCalculation;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MongoDB.Bson;
    using System.Text.Json;

    [ApiController]
    [AllowAnonymous]
    [Route("[controller]")]
    public class CostCalculatorController(ICostCalculationService costService) : ControllerBase
    {
        [HttpGet("azure-prices")]
        public async Task<IActionResult> CalculateAzureServices()
        {
            await costService.AzureServices();

            return Ok();
        }

        [HttpGet("open-ai-prices")]
        public async Task<IActionResult> CalculateOpenAiServices(int userCount, int requestsPerMonth, int imagesCount)
            => Ok(costService.OpenAiApiServices(userCount, requestsPerMonth, imagesCount));

        [HttpGet("stripe-prices")]
        public async Task<IActionResult> CalculateStripeApiServices(decimal subPrice)
            => Ok(await costService.StripeApiServices(subPrice));

        [HttpGet("fixed-prices")]
        public async Task<IActionResult> CalculateFixedPrices(string span)
            => Ok(costService.FixedPrices(span).ToString("F2"));

        [HttpGet("total-fees")]
        public async Task<IActionResult> GetTotalFees()
            => Ok(costService.GetTotalFees());
    }
}
