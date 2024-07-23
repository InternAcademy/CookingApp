namespace CookingApp.Common
{
    public static class ExceptionMessages
    {
        public class Stripe
        {
            public const string NullOrEmptyInputValues = "The provided input contains either null or an empty value.";
            public const string SubscriptionCreationFail = "Failed to create a subscription. {0}";
            
            public const string TheUserIsAlreadySubscribed = "The user already has an active subscription.";
        }
       

        public class ChatGPT
        {
            public const string ResponseError = "The ChatGPT Service failed to respond. Please try again.";
            public const string ConnectionError = "Something went wrong. Follow the log for more information.";
        }

        public class ChatService
        {
            public const string DeleteOperationFail = "Delete operation failed.";
            public const string ChageTitleOperationFail = "Change title operation failed.";
        }
    }
}
