namespace CookingApp.ViewModels.Stripe.Product
{
    public record ProductsResponse(
        string Id,
        string Name,
        long? Price,
        string PriceId,
        string Description,
        string ImageUrl);
}
