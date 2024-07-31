using CookingApp.Common.EntityConstants;
using CookingApp.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace CookingApp.ViewModels.Profile
{

    public class PreferencesRequest
    {
        public string UserId { get; set; } = default!;
        public Theme Theme { get; set; }

        [MaxLength(ValidationConstants.Preferences.LanguageLength)]
        public string Language { get; set; } = default!;
    }
}