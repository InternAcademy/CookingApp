namespace CookingApp.ViewModels.Profile
{
    using CookingApp.Models.Enums;

    public class ConfigurePreferencesRequest
    {
        public string UserId { get; set; } = default!;
        public DietaryPreference DietaryPreference { get; set; }
        public List<string> Allergies { get; set; } = default!;
        public List<string> AvoidedFoods { get; set; } = default!;
    }
}
