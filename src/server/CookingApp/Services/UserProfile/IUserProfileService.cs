using CookingApp.ViewModels.Profile;

namespace CookingApp.Services.UserProfile
{
    public interface IUserProfileService
    {
        Task<ProfileFetchResult> FetchProfile(string userId);

        Task ConfigureProfile(ConfigureProfileRequest configureProfileRequest);

        Task SaveInterfacePreferences (PreferencesRequest preferencesRequest);
    }
}
