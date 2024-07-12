namespace CookingApp.Infrastructure.Exceptions
{
    public class InvalidRecipeRequestException : Exception
    {
        public InvalidRecipeRequestException()
        {

        }

        public InvalidRecipeRequestException(string message) : base(message)
        {

        }
    }
}
