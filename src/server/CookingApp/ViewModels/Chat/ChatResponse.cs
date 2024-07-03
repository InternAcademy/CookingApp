namespace CookingApp.ViewModels.Chat
{
    public class ChatResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        public Dialog Chat { get; set; } = new Dialog();
    }
}
