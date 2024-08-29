using CookingApp.Common.Helpers.Profiles;
using CookingApp.Infrastructure.Enums;
using CookingApp.Infrastructure.Extensions;
using CookingApp.Infrastructure.Pagination;

namespace CookingApp.Services.ChatService
{
    using AutoMapper;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using System.Threading.Tasks;

    public class ChatService(IRepository<Chat> repo, IMapper mapper, IHttpContextAccessor context) : IChatService
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
            var userId = GetUser.ProfileId(context);
            var chat = await repo.GetFirstOrDefaultAsync(c => c.Id == chatId && c.UserId == userId);
            if (chat is null)
            {
                throw new NotFoundException();
            }

            return chat;
        }

        public async Task<IPagedList<ChatDataResponse>> GetActiveUserChats(string userId, int pageIndex, int pageSize = 10, bool includeDeleted = false)
        {
            var chats = await repo.GetPagedListAsync(
                pageIndex, 
                pageSize, 
                c => (c.UserId == userId) && !c.IsArchived,
                null, 
                SortDirection.Descending, 
                includeDeleted);

            return chats.MapPagedList<Chat, ChatDataResponse>(mapper);
        }
    }
}