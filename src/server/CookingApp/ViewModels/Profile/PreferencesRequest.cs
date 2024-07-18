using CookingApp.Models.Enums;

namespace CookingApp.ViewModels.Profile
{

    public class PreferencesRequest
    {
        public string UserId { get; set; } = default!;
        public Theme Theme { get; set; }
        public string Language { get; set; } = default!;

    }
}