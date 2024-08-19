﻿namespace CookingApp.Services.Limitation
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models.Enums;
    using UserProfile = Models.UserProfile;

    public class LimitationService(IRepository<UserProfile> repo) : ILimitationService
    {
        public async Task<ProcessResult> ProcessUserMessageLimitations(string userId)
        {
            var user = await repo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            ArgumentNullException.ThrowIfNull(user, nameof(user));

            if (user.Role.Type == RoleType.Admin)
            {
                return ProcessResult.MessageLimitationSuccessfull;
            }
            else if (user.Role.Type == RoleType.Premium)
            {
                var today = DateTime.UtcNow;
                var chatDate = user.Role.Limitations.ChatFromDate;
                ArgumentNullException.ThrowIfNull(chatDate, nameof(chatDate));
                var endDate = chatDate.Value.AddHours(5);

                if (today >= chatDate.Value && today <= endDate)
                {
                    if (user.Role.Limitations.ChatGeneration > 0)
                    {
                        user.Role.Limitations.ChatGeneration--;
                        await repo.UpdateAsync(user);
                        return ProcessResult.MessageLimitationSuccessfull;
                    }
                    else
                    {
                        return ProcessResult.MessageLimitationFailed;
                    }
                }

                user.Role.Limitations.ChatFromDate = today;
                user.Role.Limitations.ChatGeneration = 20;
                await repo.UpdateAsync(user);

                return ProcessResult.MessageLimitationSuccessfull;
            }
            else
            {
                var today = DateTime.UtcNow;
                var chatDate = user.Role.Limitations.ChatFromDate;
                ArgumentNullException.ThrowIfNull(chatDate, nameof(chatDate));
                var endDate = chatDate.Value.AddDays(5);

                if (today >= chatDate.Value && today <= endDate)
                {
                    if (user.Role.Limitations.ChatGeneration > 0)
                    {
                        user.Role.Limitations.ChatGeneration--;
                        await repo.UpdateAsync(user);
                        return ProcessResult.MessageLimitationSuccessfull;
                    }
                    else
                    {
                        return ProcessResult.MessageLimitationFailed;
                    }
                }

                user.Role = CreateRole.Free();
                await repo.UpdateAsync(user);

                return ProcessResult.MessageLimitationSuccessfull;
            }

        }

        public async Task<ProcessResult> ProcessUserRecipeLimitations(string userId)
        {
            var user = await repo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            ArgumentNullException.ThrowIfNull(user, nameof(user));

            if (user.Role.Limitations.RecipeGeneration <= 0)
            {
                return ProcessResult.RecipeLimitationFailed;
            }
            else if (user.Role.Limitations.RecipeGeneration > 0)
            {
                user.Role.Limitations.RecipeGeneration--;
                await repo.UpdateAsync(user);

                return ProcessResult.RecipeLimitationSuccessfull;
            }
            else if (user.Role.Type == RoleType.Admin)
            {
                return ProcessResult.RecipeLimitationSuccessfull;
            }

            return ProcessResult.RecipeLimitationFailed;
        }

        public async Task<ProcessResult> ProcessAdminLimitations(string userId)
        {
            var user = await repo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            ArgumentNullException.ThrowIfNull(user, nameof(user));

            if (user.Role.Type != RoleType.Admin)
            {
                return ProcessResult.LimitationFailed;
            }

            return ProcessResult.LimitationSuccessfull;
        }
    }
}
