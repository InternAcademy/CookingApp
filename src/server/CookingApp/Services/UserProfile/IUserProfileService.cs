using CookingApp.ViewModels.Chat;

namespace CookingApp.Services.UserProfile
{
    public interface IUserProfileService
    {
        Task CreateProfile(string userId);

        Task ConfigureProfile(ConfigureProfileRequest configureProfileRequest);
    }
}
