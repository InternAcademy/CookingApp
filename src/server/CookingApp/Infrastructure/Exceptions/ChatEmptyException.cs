namespace CookingApp.Infrastructure.Exceptions
{
    public class ChatEmptyException : Exception
    {
        public ChatEmptyException()
        {

        }

        public ChatEmptyException(string message) : base(message)
        {

        }
    }
}
