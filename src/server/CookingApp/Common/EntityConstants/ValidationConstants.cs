using CookingApp.Models.Entities;

namespace CookingApp.Common.EntityConstants
{
    public static class ValidationConstants
    {
        public static class CreateFeedback
        {
            public const int TitleMinLength = 5;
            public const int TitleMaxLength = 50;

            public const int ContentMinLength = 10;
            public const int ContentMaxLength = 10000;
        }

        public static class MessageRequests 
        {
            public const int ContentMaxLength = 800;
        }

        public static class Preferences
        {
            public const int AllergiesMax = 10;
            public const int AvoidedFoodsMax = 20;
            public const int ContentLength = 30;
            public const int LanguageLength = 30;
        }
    }
}
