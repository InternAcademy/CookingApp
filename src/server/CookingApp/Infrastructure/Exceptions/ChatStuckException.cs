namespace CookingApp.Infrastructure.Exceptions
{
    public class ChatStuckException : Exception
    {
        public ChatStuckException()
        {

        }

        public ChatStuckException(string message) : base(message)
        {

        }
    }
}
