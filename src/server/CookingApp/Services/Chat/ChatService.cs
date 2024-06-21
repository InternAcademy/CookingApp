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
        IMapper mapper) : IChatService
    {
        public async Task SaveChat(SaveChatRequest request)
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
                if(chat is null)
                {
                    throw new NotFoundException();
                }

                chat.Requests = chatMap.Requests;
                chat.Responses = chatMap.Responses;

                await repo.UpdateAsync(chat);
            }
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
