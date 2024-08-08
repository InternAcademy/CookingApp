namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Models.Enums;
    using CookingApp.Services.Limitation;
    using CookingApp.Services.Stripe;
    using CookingApp.Services.UserProfile;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Stripe.Customer;
    using CookingApp.ViewModels.Stripe.Statistics;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class AdminController(IStripeService stripeService,
        ILimitationService limitationService, 
        IUserProfileService userProfileService, 
        IHttpContextAccessor contextAccessor) : ControllerBase
    {
        [HttpGet("subscribers-count")]
        public async Task<IActionResult> GetSubsCount()
        {
            var limitResult = await limitationService.ProcessAdminLimitations(GetUser.ProfileId(contextAccessor));

            if (limitResult == ProcessResult.LimitationSuccessfull) 
            {
                var users = await stripeService.GetAllSubs();

                return new ApiResponse<List<CustomerData>>()
                {
                    Status = 200,
                    Data = users
                };
            }

            return new ApiResponse<IActionResult>()
            {
                Status = 403
            };
        }

        [HttpGet("last-10-subscribers")]
        public async Task<IActionResult> GetLast10Subs()
        {
            var limitResult = await limitationService.ProcessAdminLimitations(GetUser.ProfileId(contextAccessor));

            if (limitResult == ProcessResult.LimitationSuccessfull)
            {
                var users = await stripeService.GetAllSubs();

                var lastTen = users.OrderByDescending(x => x.Created).Take(10);

                return new ApiResponse<List<CustomerData>>()
                {
                    Status = 200,
                    Data = lastTen.ToList()
                };
            }

            return new ApiResponse<IActionResult>()
            {
                Status = 403
            };
        }

        [HttpGet("subscribers-stats")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSubscriptionStat()
        {
            var limitResult = await limitationService.ProcessAdminLimitations(GetUser.ProfileId(contextAccessor));

            if (limitResult == ProcessResult.LimitationSuccessfull)
            {
                var subscribedToCanceledRatio = await stripeService.GetSubsStats();

                return new ApiResponse<SubscriptionStatistics>()
                {
                    Status = 200,
                    Data = subscribedToCanceledRatio
                };
            }

            return new ApiResponse<IActionResult>()
            {
                Status = 403
            };
        }

        [HttpGet("last-month-income")]
        public async Task<IActionResult> GetIncome30DaysBack()
        {
            var limitResult = await limitationService.ProcessAdminLimitations(GetUser.ProfileId(contextAccessor));

            if (limitResult == ProcessResult.LimitationSuccessfull)
            {
                var incomeStats = await stripeService.GetIncome30DaysBack();

                return new ApiResponse<IncomeStatistics>()
                {
                    Status = 200,
                    Data = incomeStats
                };
            }

            return new ApiResponse<IActionResult>()
            {
                Status = 403
            };
        }

        [HttpPost("gift-tokens/{userId}")]
        public async Task GiftTokensByUid(string userId)
        {
            var limitResult = await limitationService.ProcessAdminLimitations(GetUser.ProfileId(contextAccessor));

            if (limitResult == ProcessResult.LimitationSuccessfull)
            {
                await userProfileService.GiftTokens(userId);
            }
        }
    }
}
