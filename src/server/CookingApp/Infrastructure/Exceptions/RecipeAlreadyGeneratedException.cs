namespace CookingApp.Infrastructure.Exceptions
{
    public class RecipeAlreadyGeneratedException : Exception
    {
        public RecipeAlreadyGeneratedException() : base()
        {
                
        }
        public RecipeAlreadyGeneratedException(string message) : base(message)
        {

        }
    }
}
