using CookingApp.ViewModels.Profile;

namespace CookingApp.Services.UserProfile
{
    public interface IUserProfileService
    {
        Task<ProfileFetchResult> FetchProfile(string userId,IHttpContextAccessor httpContextAccessor);

        Task ConfigurePreferences(ConfigurePreferencesRequest configureProfileRequest);

        Task SaveInterfacePreferences(PreferencesRequest preferencesRequest);
        Task GiftTokens(string userId);
    }
}
