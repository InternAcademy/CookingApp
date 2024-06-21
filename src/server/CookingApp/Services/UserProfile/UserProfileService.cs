using CookingApp.Infrastructure.Interfaces;

namespace CookingApp.Services.UserProfile
{
    public class UserProfileService(IRepository<Models.UserProfile> profileRepo) : IUserProfileService
    {
        public async Task CreateProfile(string userId)
        {
            var profileExists = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == userId);

            if (profileExists is null)
            {
                var profile = new Models.UserProfile
                {
                    UserId = userId,
                };

                await profileRepo.InsertAsync(profile);
            }
        }
    }
}
