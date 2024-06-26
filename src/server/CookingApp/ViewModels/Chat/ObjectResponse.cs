namespace CookingApp.ViewModels.Chat
{
    using OpenAI.ObjectModels.SharedModels;

    public class ObjectResponse
    {
        public Models.Chat Chat { get; set; } = default!;
        public List<ChatChoiceResponse> ChatChoiceResponses { get; set; } = default!;
    }
}
