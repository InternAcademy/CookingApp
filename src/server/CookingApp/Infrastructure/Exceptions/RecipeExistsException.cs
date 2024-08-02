namespace CookingApp.Infrastructure.Exceptions
{
    public class RecipeExistsException : Exception
    {
        public RecipeExistsException()
        {

        }

        public RecipeExistsException(string message) : base(message)
        {

        }
    }
}
