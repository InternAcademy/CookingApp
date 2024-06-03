using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CookingApp.ViewModels.Stripe.Subscription
{
    public class SubscriptionCreation
    {
        [Required]
        [JsonPropertyName("customerId")]
        public string CustomerId { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("priceId")]
        public string PriceId { get; set; } = string.Empty;
    }
}
