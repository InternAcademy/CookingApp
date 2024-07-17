namespace CookingApp.ViewModels.Stripe.Subscription
{
    public record SubscriptionCreationResponse(
        string SubscriptionId,
        string InvoiceId,
        string InvoiceUrl);
}
