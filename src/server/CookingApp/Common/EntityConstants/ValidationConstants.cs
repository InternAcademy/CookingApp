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
    }
}
