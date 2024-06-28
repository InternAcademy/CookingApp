using CookingApp.ViewModels.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using CookingApp.ViewModels.Stripe.Subscription;

namespace CookingApp.Services.Stripe
{
    public interface IStripeService
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<SubscriptionCreationResponse> CreateSubscriptionAsync(SubscriptionCreation model);
        Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(SubscriptionCancellation model);
    }
}
