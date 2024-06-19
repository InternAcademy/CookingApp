namespace CookingApp.Services.ChatService
{
    using CookingApp.Models;

    public interface IChatService
    {
        Task<Chat> GetById(string chatId);
        Task ArchiveChat(string chatId);
        Task DeleteChat(string chatId);
    }
}
