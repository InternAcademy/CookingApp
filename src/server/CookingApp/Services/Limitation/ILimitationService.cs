using CookingApp.Models.Enums;

namespace CookingApp.Services.Limitation
{
    public interface ILimitationService
    {
        Task<ProcessResult> ProcessUserMessageLimitations(string userId);
        Task<ProcessResult> ProcessUserRecipeLimitations(string userId);
    }
}
