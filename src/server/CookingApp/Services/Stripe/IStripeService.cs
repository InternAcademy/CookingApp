using CookingApp.ViewModels.Stripe.Customer;
using CookingApp.ViewModels.Stripe.Product;
using CookingApp.ViewModels.Stripe.Subscription;

namespace CookingApp.Services.Stripe
{
    public interface IStripeService
    {
        Task<CustomerCreationResponse> CreateCustomerAsync(string email);
        Task<IEnumerable<ProductsResponse>> GetProductsAsync();
        Task<SubscriptionCreationResponse> CreateSubscriptionAsync(SubscriptionCreation model);
        Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(SubscriptionCancellation model);
    }
}
