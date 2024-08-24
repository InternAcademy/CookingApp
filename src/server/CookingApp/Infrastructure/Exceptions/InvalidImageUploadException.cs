namespace CookingApp.Infrastructure.Exceptions
{
    public class InvalidImageUploadException : Exception
    {
        public InvalidImageUploadException()
        {

        }

        public InvalidImageUploadException(string message) : base(message)
        {

        }
    }
}
