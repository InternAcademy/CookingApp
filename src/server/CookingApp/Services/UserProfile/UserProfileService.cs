using AutoMapper;
using CookingApp.Common.EntityConstants;
using CookingApp.Common.Helpers.Images;
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
    public class UserProfileService(IRepository<Models.UserProfile> profileRepo, 
        IRepository<Models.Entities.Recipe> recipeRepo, 
        IRepository<Models.Chat> chatRepo, 
        IHttpContextAccessor httpContextAccessor, 
        IFileService fileService) : IUserProfileService
    {
        public async Task<ProfileFetchResult> FetchProfile(string userId,IHttpContextAccessor httpContextAccessor)
        {
            var profile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            var username = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim=>claim.Type=="name");
            if (profile is null)
            {
                profile = await CreateNewUserProfile(userId, username.Value);
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

        private async Task<Models.UserProfile> CreateNewUserProfile(string userId, string username)
        {
            var profile = new Models.UserProfile
            {
                Role = CreateRole.Free(),
                InterfacePreference = new InterfacePreference().CreateInterface(),
                DietaryPreference = Models.Enums.DietaryPreference.None,
                Allergies = new List<string>(),
                AvoidedFoods = new List<string>(),
                UserId = userId,
                Name = username
            };

            await profileRepo.InsertAsync(profile);

            var chat = UserCreationConstants.FamilySizedMargheritaPizzaChat;
            chat.UserId = userId;

            await chatRepo.InsertAsync(chat);

            return profile;
        }

        public async Task UploadPfp(string image)
        {
            var imageBytes = Convert.FromBase64String(image.Split(',')[1]);

            const int maxFileSize = 2 * 1024 * 1024; 
            if (imageBytes.Length > maxFileSize)
            {
                throw new InvalidImageUploadException("Maximum image size exceeded. Please upload an image under 2MB.");
            }

            // Validate the MIME type
            var mimeType = ImageHelper.GetMimeType(imageBytes);
            var validImageTypes = new List<string> { "image/jpeg", "image/png", "image/webp" };
            if (!validImageTypes.Contains(mimeType))
            {
                throw new InvalidImageUploadException("Invalid image type. Please upload a JPG, PNG, or WEBP image.");
            }

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
