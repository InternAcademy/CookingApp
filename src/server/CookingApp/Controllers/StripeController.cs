
using CookingApp.ViewModels.Stripe.Customer;

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

        [HttpGet("my-subscription")]
        public async Task<ApiResponse<CustomerData>> GetMySubscription()
        {
            var sub = await stripeService.GetSubscription();
            return new ApiResponse<CustomerData>()
            {
                Status = 200,
                Data = sub
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

        [HttpPost("cancel/{subscriptionId}")]
        public async Task<ApiResponse<SubscriptionCancellationResponse>> CancelSubscriptionAsync(string subscriptionId)
        {
            var subscription = await stripeService.CancelSubscriptionAsync(subscriptionId);

            return new ApiResponse<SubscriptionCancellationResponse>()
            {
                Status = 200,
                Data = subscription
            };
        }
    }
}
