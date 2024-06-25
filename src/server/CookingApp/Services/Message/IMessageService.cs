namespace CookingApp.Services.Message
{
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using OpenAI.ObjectModels.SharedModels;

    public interface IMessageService
    {
        Task<ObjectResponse> SendMessage(string chatId, string message);

        Task<List<ChatChoiceResponse>> CreateMessage(string userId, string message);

        Task<List<ChatChoiceResponse>> GenerateTitle(Chat chat);
    }
}
