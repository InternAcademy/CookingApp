using CookingApp.ViewModels.Chat;

namespace CookingApp.Services.UserProfile
{
    public interface IUserProfileService
    {
        Task VerifyProfile(string userId);

        Task ConfigureProfile(ConfigureProfileRequest configureProfileRequest);
    }
}
