using OpenAI.ObjectModels.SharedModels;

namespace CookingApp.ViewModels.Chat
{
    public class ChatMessageResponce
    {
        public Models.Chat Chat { get; set; } = default!;
        public List<ChatChoiceResponse> ChatChoiceResponses { get; set; } = default!;
    }
}
