namespace CookingApp.Services.ChatService
{
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Services.Message;
    using System.Threading.Tasks;

    public class ChatService(
        IRepository<Chat> repository,
        IMessageService messageService,
        ILogger<ChatService> logger) : IChatService
    {
        public Task ArchiveChat(string chatId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteChat(string chatId)
        {
            throw new NotImplementedException();
        }

        public Task<Chat> GetById(string chatId)
        {
            throw new NotImplementedException();
        }
    }
}
