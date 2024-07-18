using CookingApp.Common.Helpers.Profiles;
using CookingApp.Infrastructure.Exceptions;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models.ValueObjects;
using CookingApp.ViewModels.Profile;
using Microsoft.AspNetCore.Mvc;

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
                    Role = CreateRole.Free(),
                    UserId = userId,
                };

                await profileRepo.InsertAsync(profile);
            }
        }
        
        public async Task ConfigureProfile(ConfigureProfileRequest configureProfileRequest)
        {
            var profile = await profileRepo
                .GetFirstOrDefaultAsync(a => a.UserId == configureProfileRequest.UserId);

            if (profile is null)
            {
                throw new NotFoundException();
            }

            profile.Allergies = configureProfileRequest.Allergies;
            profile.AvoidedFoods = configureProfileRequest.AvoidedFoods;
            profile.DietaryPreference = configureProfileRequest.DietaryPreference;

            await profileRepo.UpdateAsync(profile);
        }

        public async Task SaveInterfacePreferences(PreferencesRequest preferencesRequest)     
        {
           var profile = await profileRepo
                .GetFirstOrDefaultAsync(a => a.UserId == preferencesRequest.UserId);

            if (profile is null)
            {
                throw new NotFoundException();
            }

            profile.InterfacePreference = new InterfacePreference()
            {
                Theme = preferencesRequest.Theme,
                Language = preferencesRequest.Language
            };

            await profileRepo.UpdateAsync(profile);
        }

    }
}
