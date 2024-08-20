namespace CookingApp.ViewModels.Message
{
    using CookingApp.Models.Enums;

    public class MessageData
    {
        public MessageType Type { get; set; } = default!;
        public string Content { get; set; } = default!;
        public string? ChatId { get; set; }

    }
}
