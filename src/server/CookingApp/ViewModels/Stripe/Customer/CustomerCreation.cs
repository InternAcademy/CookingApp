using System.ComponentModel.DataAnnotations;

namespace CookingApp.ViewModels.Stripe.Customer
{
    public class CustomerCreation
    {
        public string Email { get; init; } = string.Empty;
    }
}
