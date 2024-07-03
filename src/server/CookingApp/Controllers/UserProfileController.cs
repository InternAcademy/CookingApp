using CookingApp.Common.Helpers.Profiles;
using CookingApp.Services.UserProfile;
using CookingApp.ViewModels.Api;
using CookingApp.ViewModels.Chat;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    [ApiController]
    public class UserProfileController(IHttpContextAccessor httpContextAccessor, 
        IUserProfileService userProfileService) : ControllerBase
    {

        [HttpGet("verify-profile")]
        public async Task<IActionResult> VerifyProfile()
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            await userProfileService.VerifyProfile(userId);

            return new ApiResponse<string>()
            {
                Status = 200,
                Data = userId
            };
        }

        [HttpGet("configure-profile")]
        public async Task<IActionResult> ConfigureProfile([FromBody] ConfigureProfileRequest configureProfileRequest)
        {
            await userProfileService.ConfigureProfile(configureProfileRequest);

            return new ApiResponse<ConfigureProfileRequest>()
            {
                Status = 200,
                Data = configureProfileRequest
            };
        }
    }
}
