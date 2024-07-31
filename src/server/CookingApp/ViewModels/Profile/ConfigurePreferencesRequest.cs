namespace CookingApp.ViewModels.Profile
{
    using CookingApp.Common.EntityConstants;
    using CookingApp.Models.Enums;
    using System.ComponentModel.DataAnnotations;

    public class ConfigurePreferencesRequest
    {
        public string UserId { get; set; } = default!;
        public DietaryPreference DietaryPreference { get; set; }

        [MaxLength(ValidationConstants.Preferences.AllergiesMax)]
        [MaxStringLengthInList(ValidationConstants.Preferences.ContentLength)]
        public List<string> Allergies { get; set; } = default!;

        [MaxLength(ValidationConstants.Preferences.AvoidedFoodsMax)]
        [MaxStringLengthInList(ValidationConstants.Preferences.ContentLength)]
        public List<string> AvoidedFoods { get; set; } = default!;
    }
}
