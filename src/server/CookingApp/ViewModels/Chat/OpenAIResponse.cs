using OpenAI.Chat;

namespace CookingApp.ViewModels.Chat
{
    public class OpenAIResponse
    {
        public string ChatId { get; set; } = default!;
        public ChatCompletion ChatCompletion { get; set; } = default!;
    }
}
