namespace CookingApp.ViewModels.Stripe.Product
{
    public class StripeProduct
    {
        public string Name { get; set; } = string.Empty;
        public string PriceId { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Type { get; set; } = string.Empty;
        public Dictionary<string, string> Benefits { get; set; } = new Dictionary<string, string>();
    }
}
