using CookingApp.Models.Enums;

namespace CookingApp.ViewModels.Message
{
    public class MessageRequest
    {
        public MessageType Type { get; set; } = default!;
        public IFormFile? Image { get; set; }
        public string? Content { get; set; }
        public string? ChatId { get; set; }
    }
}
