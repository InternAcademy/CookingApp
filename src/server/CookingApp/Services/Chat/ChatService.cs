namespace CookingApp.Services.ChatService
{
    using AutoMapper;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Services.Message;
    using CookingApp.ViewModels.Chat;
    using System.Threading.Tasks;


    public class ChatService(
        IRepository<Chat> repo,
        IMessageService messageService,
        IMapper mapper) : IChatService
    {
        public async Task<Chat> SaveChat(SaveChatRequest request)
        {
            var chatMap = mapper.Map<Chat>(request);

            var chatObject = await repo.GetByIdAsync(request.ExternalId);
            if (chatObject is null)
            {
                var titleResponse = await messageService.GenerateTitle(chatMap);
                chatMap.Title = titleResponse.FirstOrDefault().Message.Content;

                await repo.InsertAsync(chatMap);
            }
            else
            {
                var chat = await repo.GetFirstOrDefaultAsync(a => a.Id == request.ExternalId);
                if (chat is null)
                {
                    throw new NotFoundException();
                }

                chat.Requests = chatMap.Requests;
                chat.Responses = chatMap.Responses;

                await repo.UpdateAsync(chat);
            }

            return chatMap;
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

        public async Task<IEnumerable<ContentResponse>> GetActiveUserChats(string userId)
        {
            var chats = await repo.GetAllAsync(a => a.UserId == userId);

            return chats
                .Where(a => !a.IsDeleted && !a.IsArchived)
                .Select(a => new ContentResponse { ChatId = a.Id, Title = a.Title, Time = a.CreatedDateTime });
        }
    }
}
