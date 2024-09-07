using System.ComponentModel.DataAnnotations;

namespace CookingApp.ViewModels.Stripe.Subscription
{
    public class InvoiceCreation
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string PriceId { get; set; } = string.Empty;
    }
}
