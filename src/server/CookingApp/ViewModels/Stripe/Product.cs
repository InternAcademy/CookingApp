namespace CookingApp.ViewModels.Stripe
{
    public record Product(
        string Id,
        string Name,
        long? Price,
        string PriceId,
        string Description);
}
