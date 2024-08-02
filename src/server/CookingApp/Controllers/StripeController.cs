
namespace CookingApp.Controllers
{
    using CookingApp.Services.Stripe;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Stripe.Subscription;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController(IStripeService stripeService) : ControllerBase
    {
        [HttpGet("products")]
        public async Task<ApiResponse<List<string>>> GetProductsAsync()
        {
            var products = await stripeService.GetProductsAsync();

            return new ApiResponse<List<string>>()
            {
                Status = 200,
                Data = products.ToList()
            };

        }

        [HttpPost("subscription")]
        public async Task<ApiResponse<SubscriptionCreationResponse>> CreateSubscriptionAsync([FromBody] SubscriptionCreation model)
        {
            var customer = await stripeService.CreateSubscriptionAsync(model);

            return new ApiResponse<SubscriptionCreationResponse>()
            {
                Status = 200,
                Data = customer
            };
        }

        [HttpPost("cancel")]
        public async Task<ApiResponse<SubscriptionCancellationResponse>> CancelSubscriptionAsync([FromBody] SubscriptionCancellation model)
        {
            var subscription = await stripeService.CancelSubscriptionAsync(model);

            return new ApiResponse<SubscriptionCancellationResponse>()
            {
                Status = 200,
                Data = subscription
            };
        }
    }
}
