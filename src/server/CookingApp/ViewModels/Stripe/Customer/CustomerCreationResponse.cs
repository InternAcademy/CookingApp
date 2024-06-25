using System.Text.Json.Serialization;

namespace CookingApp.ViewModels.Stripe.Customer
{
    public record CustomerCreationResponse(
        string Id,
        string Email,
        string ErrorMessage);
}
