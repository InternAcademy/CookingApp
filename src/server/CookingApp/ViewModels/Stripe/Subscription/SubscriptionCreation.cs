namespace CookingApp.ViewModels.Stripe.Subscription
{
    public class SubscriptionCreation
    {
        public string CustomerId { get; set; } = string.Empty;

        public string PriceId { get; set; } = string.Empty;
    }
}
