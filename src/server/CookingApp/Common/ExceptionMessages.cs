namespace CookingApp.Common
{
    public static class ExceptionMessages
    {
        public const string NullOrEmptyInputValues = "The provided input contains either null or an empty value";
        public const string SubscriptionCreationFail = "Failed to create a subscription. {0}";
        public const string ResponseRequestFailed = "The ChatGPT API failed to respond. Please try again.";
    }
}
