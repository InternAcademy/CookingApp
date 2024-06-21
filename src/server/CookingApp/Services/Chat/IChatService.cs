namespace CookingApp.Services.ChatService
{
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;

    public interface IChatService
    {
        Task SaveChat(SaveChatRequest request);
        Task<Chat> GetById(string chatId);
        Task ArchiveChat(string chatId);
        Task DeleteChat(string chatId);
    }
}
