namespace CookingApp.ViewModels.Chat
{
    using CookingApp.Models.Enums;
    using CookingApp.Models;

    public class ConfigureProfileRequest
    {
        public string UserId { get; set; } = default!;
        public DietaryPreference DietaryPreference { get; set; }
        public List<Allergy> Allergies { get; set; } = default!;
        public List<Food> AvoidedFoods { get; set; } = default!;
    }
}
