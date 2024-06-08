using System.ComponentModel.DataAnnotations;

namespace CookingApp.ViewModels.Stripe.Customer
{
    public class CustomerCreation
    {
        [Required]
        [EmailAddress]
        public string Email { get; init; } = string.Empty;
    }
}
