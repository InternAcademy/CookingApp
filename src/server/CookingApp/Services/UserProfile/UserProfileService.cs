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
        public async Task<ProfileFetchResult> FetchProfile(string userId)
        {
            var profile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == userId);

            if (profile is null)
            {
                profile = new Models.UserProfile
                {
                    Role = CreateRole.Free(),
                    InterfacePreference = new InterfacePreference().CreateInterface(),
                    DietaryPreference = Models.Enums.DietaryPreference.None,
                    Allergies = new List<string>(),
                    AvoidedFoods = new List<string>(),
                    UserId = userId,
                };

                await profileRepo.InsertAsync(profile);
            }

            return new ProfileFetchResult
            {
                InterfacePreference = profile.InterfacePreference,
                Name = profile.Name,
                Role = profile.Role,
                DietaryPreference = profile.DietaryPreference,
                Allergies = profile.Allergies,
                AvoidedFoods = profile.AvoidedFoods,
            };
        }
        
        public async Task ConfigurePreferences(ConfigurePreferencesRequest configureProfileRequest)
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
