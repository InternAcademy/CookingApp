using CookingApp.Models.Enums;

namespace CookingApp.Common
{
    public static class LimitationMessages
    {
        public static readonly Dictionary<ProcessResult,string> ProcessMessages =new Dictionary<ProcessResult,string>()
        {
            {
                ProcessResult.MessageLimitationFailed,"You have reached the maximum number of messages!"
            },
            {
                ProcessResult.RecipeLimitationFailed,"You have reached the maximum number of recipe generations!"
            },    
        };
    }
}
