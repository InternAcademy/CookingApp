using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models;
using System.Security.Claims;

namespace CookingApp.Common.Helpers.Profiles
{
    public static class GetUser
    {
        public static string ProfileId(IHttpContextAccessor httpContextAccessor)
        {
            var userProfile = httpContextAccessor.HttpContext?.User;
            if (userProfile is null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }

            var userId = userProfile.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }

            return userId;
        }

        public static async Task<UserProfile> Profile(IHttpContextAccessor httpContextAccessor, IRepository<UserProfile> repo)
        {
            string uId = ProfileId(httpContextAccessor);

            var userProfile = await repo.GetFirstOrDefaultAsync(a => a.UserId == uId);
            if (userProfile is null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }

            return userProfile;
        }
    }
}
