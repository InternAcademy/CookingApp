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

        [HttpGet("create-profile")]
        public async Task<IActionResult> CreateProfile()
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            await userProfileService.CreateProfile(userId);

            return Ok(userId);
        }

        [HttpGet("configure-profile")]
        public async Task<ApiResponse<bool>> ConfigureProfile([FromBody] ConfigureProfileRequest request)
        {
            await userProfileService.ConfigureProfile(request);

            return new ApiResponse<bool>()
            {
                Status = 200
            };
        }

        [HttpPost("save-preferences")]
        public async Task<ApiResponse<bool>> SavePreferences([FromBody] PreferencesRequest request)
        {
            await userProfileService.SaveInterfacePreferences(request);

            return new ApiResponse<bool>()
            {
                Status = 200
            };
        }
    }
}
