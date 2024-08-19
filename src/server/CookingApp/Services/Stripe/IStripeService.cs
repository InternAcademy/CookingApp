using CookingApp.ViewModels.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using CookingApp.ViewModels.Stripe.Statistics;
using CookingApp.ViewModels.Stripe.Subscription;
using Stripe;

namespace CookingApp.Services.Stripe
{
    public interface IStripeService
    {
        Task<IEnumerable<string>> GetProductsAsync();
        Task<SubscriptionCreationResponse> CreateSubscriptionAsync(SubscriptionCreation model);
        Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(SubscriptionCancellation model);
        Task<List<CustomerData>> GetAllSubs();
        Task<SubscriptionStatistics> GetSubsStats();
        Task<IncomeStatistics> GetIncome30DaysBack();
    }
}
