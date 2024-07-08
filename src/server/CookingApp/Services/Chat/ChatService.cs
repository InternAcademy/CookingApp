namespace CookingApp.Services.ChatService
{
    using AutoMapper;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using System.Threading.Tasks;

    public class ChatService(IRepository<Chat> repo) : IChatService
    {
        public async Task<Chat> CreateChat(string userId)
        {
            var chat = new Chat()
            {
                UserId = userId,
                Requests = [],
                Responses = []
            };
            await repo.InsertAsync(chat);

            return chat;
        }

        public async Task<Chat> UpdateChat(string chatId, Message request, Message response)
        {
            var chat = await repo.GetFirstOrDefaultAsync(a => a.Id == chatId);
            ArgumentNullException.ThrowIfNull(chat);

            chat.Requests.Add(request);
            chat.Responses.Add(response);

            await repo.UpdateAsync(chat);

            return chat;
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

        public async Task<IEnumerable<ChatDataResponse>> GetActiveUserChats(string userId)
        {
            var chats = await repo.GetAllAsync(a => a.UserId == userId);

            return chats
                .Where(a => !a.IsDeleted && !a.IsArchived)
                .Select(a => new ChatDataResponse { ChatId = a.Id, Title = a.Title, Time = a.CreatedDateTime });
        }
    }
}