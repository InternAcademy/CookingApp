using CookingApp.Models.ValueObjects;

namespace CookingApp.ViewModels.Profile
{
    public class ProfileFetchResult
    {
        public InterfacePreference InterfacePreference { get; set; } = default!;
        public string Name { get; set; } = default!;
        public Role Role { get; set; } = default!;
    }
}
