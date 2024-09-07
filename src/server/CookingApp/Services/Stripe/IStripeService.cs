using CookingApp.ViewModels.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using CookingApp.ViewModels.Stripe.Product;
using CookingApp.ViewModels.Stripe.Statistics;
using CookingApp.ViewModels.Stripe.Subscription;
using Stripe;

namespace CookingApp.Services.Stripe
{
    public interface IStripeService
    {
        Task<IEnumerable<StripeProduct>> GetProductsAsync();
        Task<InvoiceCreationResponse> CreateSubscriptionAsync(InvoiceCreation model);
        Task<InvoiceCreationResponse> BuyPackAsync(InvoiceCreation model);

        Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(string subscriptionId);
        Task<List<CustomerData>> GetAllSubs();
        Task<SubscriptionStatistics> GetSubsStats();
        Task<IncomeStatistics> GetIncome30DaysBack();

        Task<CustomerData> GetSubscription();
    }
}
