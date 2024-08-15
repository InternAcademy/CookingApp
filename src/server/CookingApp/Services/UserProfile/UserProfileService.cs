using CookingApp.Common.Helpers.Profiles;
using CookingApp.Infrastructure.Exceptions;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models.ValueObjects;
using CookingApp.Services.File;
using CookingApp.ViewModels.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
 
namespace CookingApp.Services.UserProfile
{
    public class UserProfileService(IRepository<Models.UserProfile> profileRepo, IHttpContextAccessor httpContextAccessor, IFileService fileService) : IUserProfileService
    {
        public async Task<ProfileFetchResult> FetchProfile(string userId,IHttpContextAccessor httpContextAccessor)
        {
            var profile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            var username = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim=>claim.Type=="name");
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
                    Name = username.Value
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
                ImageUrl = profile.ImageUrl
            };
        }

        public async Task UploadPfp(string image)
        {
            var user = await GetUser.Profile(httpContextAccessor, profileRepo);
            var imageUrl = await fileService.UploadFileAndGetUrl(Services.File.File.ConvertDataUriToFormFile(image));

            user.ImageUrl = imageUrl;
            await profileRepo.UpdateAsync(user);
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

        public async Task GiftTokens(string userId)
        {
            var profile = await profileRepo
                .GetFirstOrDefaultAsync(a => a.UserId == userId);

            if (profile is null)
            {
                throw new NotFoundException();
            }

            profile.Role.Limitations.RecipeGeneration = profile.Role.Limitations.RecipeGeneration + 10;
            profile.Role.Limitations.ChatGeneration = profile.Role.Limitations.ChatGeneration + 100;

            await profileRepo.UpdateAsync(profile);
        }
    }
}
