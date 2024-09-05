
using CookingApp.ViewModels.Stripe.Customer;

namespace CookingApp.Controllers
{
    using CookingApp.Services.Stripe;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Stripe.Product;
    using CookingApp.ViewModels.Stripe.Subscription;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController(IStripeService stripeService) : ControllerBase
    {
        [HttpGet("products")]
        public async Task<ApiResponse<List<StripeProduct>>> GetProductsAsync()
        {
            var products = await stripeService.GetProductsAsync();

            return new ApiResponse<List<StripeProduct>>()
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
        public async Task<ApiResponse<InvoiceCreationResponse>> CreateSubscriptionAsync([FromBody] InvoiceCreation model)
        {
            var customer = await stripeService.CreateSubscriptionAsync(model);

            return new ApiResponse<InvoiceCreationResponse>()
            {
                Status = 200,
                Data = customer
            };
        }

        [HttpPost("pack")]
        public async Task<ApiResponse<InvoiceCreationResponse>> BuyPackAsync([FromBody] InvoiceCreation model)
        {
            var customer = await stripeService.BuyPackAsync(model);

            return new ApiResponse<InvoiceCreationResponse>()
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
