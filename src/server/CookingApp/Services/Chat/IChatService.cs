namespace CookingApp.Services.ChatService
{
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;

    public interface IChatService
    {
        Task<Chat> UpdateChat(string chatId, Message request, Message response);
        Task<Chat> GetById(string chatId);
        Task ArchiveChat(string chatId);
        Task DeleteChat(string chatId);
        Task<Chat> CreateChat(string userId);
        Task<IEnumerable<ChatDataResponse>> GetActiveUserChats(string userId);
    }
}
