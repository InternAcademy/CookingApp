using CookingApp.Common.Helpers.Profiles;
using CookingApp.Services.UserProfile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    [ApiController]
    public class UserProfileController(IHttpContextAccessor httpContextAccessor, 
        IUserProfileService userProfileService) : ControllerBase
    {

        [HttpGet("create-profile")]
        public async Task<IActionResult> CreateProfile([FromBody] string allergies)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            await userProfileService.CreateProfile(userId);

            return Ok(userId);
        }
    }
}
