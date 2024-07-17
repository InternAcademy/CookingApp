using CookingApp.Models.Enums;

namespace CookingApp.ViewModels.Profile
{

    public class PreferencesRequest
    {
        public string UserId { get; set; } = string.Empty;
        public Theme Theme { get; set; }
        public Language Language { get; set; }

    }
}