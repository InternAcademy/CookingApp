namespace CookingApp.Services.ChatService
{
    using CookingApp.Common;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Services.Message;
    using System.Threading.Tasks;
    using CookingApp.ViewModels.Chat;
    using AutoMapper;
    using CookingApp.Infrastructure.Exceptions;


    public class ChatService(
        IRepository<Chat> repo,
        IMessageService messageService,
        ILogger<ChatService> logger,
        IMapper mapper) : IChatService
    {
        public async Task SaveChat(SaveChatRequest request)
        {
            var chat = mapper.Map<Chat>(request);
            await repo.InsertAsync(chat);
        }

        public async Task ArchiveChat(string chatId)
        {
            var chat = await repo.GetByIdAsync(chatId);
            if (chat is null)
            {
                throw new NotFoundException();
            }
            chat.IsArchived = chat.IsArchived!;
            
            await repo.UpdateAsync(chat);
        }

        public async Task DeleteChat(string chatId)
            => await repo.DeleteByIdAsync(chatId);

        public async Task<Chat> GetById(string chatId)
        {
            var chat = await repo.GetByIdAsync(chatId);
            if (chat is null)
            {
                throw new NotFoundException();
            }

            return chat;
        }
    }
}
