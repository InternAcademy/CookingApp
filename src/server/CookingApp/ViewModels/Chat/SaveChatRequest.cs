using CookingApp.Infrastructure.Mapping;

namespace CookingApp.ViewModels.Chat
{
    using CookingApp.Models;
    public class SaveChatRequest
    {
        public string ExternalId { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string UserId { get; set; } = default!;

        public List<Message> Requests { get; set; } = default!;
        public List<Message> Responses { get; set; } = default!;
    }
}
