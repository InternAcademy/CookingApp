namespace CookingApp.Common
{
    public static class ExceptionMessages
    {
        public const string NullOrEmptyInputValues = "The provided input contains either null or an empty value";
        public const string SubscriptionCreationFail = "Failed to create a subscription. {0}";

        public class ChatGPT
        {
            public const string ResponseError = "The ChatGPT Service failed to respond. Please try again.";
            public const string ConnectionError = "Something went wrong. Follow the log for more information.";
        }
    }
}
