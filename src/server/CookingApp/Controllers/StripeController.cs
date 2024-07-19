
namespace CookingApp.Controllers
{
    using CookingApp.Services.Stripe;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Stripe.Customer;
    using CookingApp.ViewModels.Stripe.Statistics;
    using CookingApp.ViewModels.Stripe.Subscription;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Stripe;
    using Product = ViewModels.Stripe.Product;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController(IStripeService stripeService) : ControllerBase
    {
        [HttpGet("products")]
        public async Task<ApiResponse<List<Product>>> GetProductsAsync()
        {
            var products = await stripeService.GetProductsAsync();

            return new ApiResponse<List<Product>>()
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


        [HttpGet("subs-count")]

        public async Task<ApiResponse<List<CustomerData>>> GetSubsCount()
        {
            var users = await stripeService.GetAllSubs();

            return new ApiResponse<List<CustomerData>>()
            {
                Status = 200,
                Data = users.ToList()
            };
        }

        [HttpGet("last-10-subs")]
        public async Task<ApiResponse<List<CustomerData>>> GetLast10Subs()
        {
            var users = await stripeService.GetAllSubs();

            var lastTen = users.OrderByDescending(x => x.Created).Take(10);

            return new ApiResponse<List<CustomerData>>()
            {
                Status = 200,
                Data = lastTen.ToList()
            };
        }

        [HttpGet("subs-stats")]
        [AllowAnonymous]
        public async Task<ApiResponse<SubscriptionStatistics>> GetSubscriptionStat()
        {
            var subscribedToCanceledRatio = await stripeService.GetSubsStats();

            return new ApiResponse<SubscriptionStatistics>()
            {
                Status = 200,
                Data = subscribedToCanceledRatio
            };
        }

        [HttpGet("last-month-income")]
        public async Task<ApiResponse<IncomeStatistics>> GetIncome30DaysBack()
        {
            var incomeStats = await stripeService.GetIncome30DaysBack();

            return new ApiResponse<IncomeStatistics>()
            {
                Status = 200,
                Data = incomeStats
            };
        }
        
    }
}
