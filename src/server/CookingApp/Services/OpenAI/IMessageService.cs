namespace CookingApp.Services.OpenAI
{
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using global::OpenAI.Chat;

    public interface IMessageService
    {
        Task<OpenAIResponse> SendMessage(string userId, MessageModel message, string? chatId);
    }
}
