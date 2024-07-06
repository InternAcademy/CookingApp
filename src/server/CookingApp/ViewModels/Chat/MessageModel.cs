namespace CookingApp.ViewModels.Chat
{
    using CookingApp.Models.Enums;

    public class MessageModel
    {
        public MessageType Type { get; set; } = default!;

        public string Content { get; set; } = default!;
    }
}
