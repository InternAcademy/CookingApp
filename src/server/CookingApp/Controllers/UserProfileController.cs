using CookingApp.Common.Helpers.Profiles;
using CookingApp.Services.UserProfile;
using CookingApp.ViewModels.Api;
using CookingApp.ViewModels.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    [ApiController]
    public class UserProfileController(IHttpContextAccessor httpContextAccessor,
        IUserProfileService userProfileService) : ControllerBase
    {

        [HttpGet("fetch-profile")]
        public async Task<IActionResult> FetchProfile()
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            return new ApiResponse<ProfileFetchResult>()
            {
                Status = 200,
                Data = await userProfileService.FetchProfile(userId,httpContextAccessor)
            };
        }

        [HttpPost("preferences")]
        public async Task<IActionResult> ConfigurePreferences([FromBody] ConfigurePreferencesRequest request)
        {
            await userProfileService.ConfigurePreferences(request);

            return new ApiResponse<bool>()
            {
                Status = 200
            };
        }
        
        [HttpPost("save-preferences")]
        public async Task<IActionResult> SavePreferences([FromBody] PreferencesRequest request)
        {
            await userProfileService.SaveInterfacePreferences(request);

            return new ApiResponse<bool>()
            {
                Status = 200
            };
        }
    }
}
