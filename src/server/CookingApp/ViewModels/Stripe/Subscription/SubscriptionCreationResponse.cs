namespace CookingApp.ViewModels.Stripe.Subscription
{
    public record SubscriptionCreationResponse(
        string SubscriptionId,
        string ClientSecret,
        string InvoiceId,
        string InvoiceUrl);
}
