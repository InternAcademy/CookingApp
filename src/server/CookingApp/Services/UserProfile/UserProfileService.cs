﻿using CookingApp.Infrastructure.Exceptions;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.ViewModels.Chat;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Services.UserProfile
{
    public class UserProfileService(IRepository<Models.UserProfile> profileRepo) : IUserProfileService
    {
        public async Task VerifyProfile(string userId)
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
    }
}
