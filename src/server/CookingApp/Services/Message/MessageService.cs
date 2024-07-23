namespace CookingApp.Services.Message
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Common.Helpers.Messages;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Models.Enums;
    using CookingApp.Services.ChatService;
    using CookingApp.Services.File;
    using CookingApp.Services.OpenAI;
    using CookingApp.Common.Helpers.Recipes;
    using CookingApp.ViewModels.Message;
    using global::OpenAI.Chat;
    using System;
    using CookingApp.Common.EntityConstants;

    public partial class MessageService(ChatClient client,
        IChatService chatService,
        IRepository<Chat> chatRepo,
        IRepository<UserProfile> profileRepo,
        IFileService fileService) : IMessageService
    {
        public async Task<MessageData> SendMessage(string userId, MessageData request)
        {
            var chat = new Chat();
            if (request.ChatId == null)
                chat = await chatService.CreateChat(userId);
            else
                chat = await chatRepo.GetByIdAsync(request.ChatId);
            ArgumentNullException.ThrowIfNull(chat);

            var userProfile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == chat.UserId);
            ArgumentNullException.ThrowIfNull(userProfile);

            var messages = new List<ChatMessage>
            {
                new SystemChatMessage(Completions.BuildSystemMessage(userProfile))
            };
            if (chat.Requests.Count > 0 && chat.Responses.Count > 0)
            {
                int requestStart = Math.Max(0, chat.Requests.Count - Messages.MemoryRange);
                int responseStart = Math.Max(0, chat.Responses.Count - Messages.MemoryRange);

                int end = Math.Min(chat.Requests.Count, chat.Responses.Count);

                int start = Math.Max(requestStart, responseStart);

                for (int i = start; i < end; i++)
                {
                    if (i < chat.Requests.Count)
                    {
                        messages.Add(new UserChatMessage(chat.Requests[i].Content));
                    }

                    if (i < chat.Responses.Count)
                    {
                        messages.Add(new AssistantChatMessage(chat.Responses[i].Content));
                    }
                }
            }

            var saveRequest = new Message()
            {
                DateTime = DateTime.Now,
                Type = request.Type
            };
            var saveResponse = new Message()
            {
                DateTime = DateTime.Now,
                Type = MessageType.Text
            };

            if(request.Type == MessageType.Image && request.Content != null)
            {
                var imgPath = await fileService.UploadFileAndGetUrl(File.ConvertDataUriToFormFile(request.Content));

                messages.Add(new UserChatMessage(
                        ChatMessageContentPart.CreateTextMessageContentPart(Completions.ImageRequest),
                        ChatMessageContentPart.CreateImageMessageContentPart(new Uri(imgPath))));

                saveRequest.Content = imgPath;
            }
            else if(request.Content != null)
            {
                messages.Add(new UserChatMessage(request.Content));

                saveRequest.Content = request.Content;
            }
            
            var response = await client.CompleteChatAsync(messages);
            var responceText = response.Value.Content[0].Text;

            if (RecipeHelpers.IsRecipe(responceText))
            {
                saveResponse.Type = MessageType.Recipe;
                saveResponse.Content = MessageHelper.RemoveMarkdown(RecipeHelpers.UpdateRecipe(responceText));
            }
            else
            {
                saveResponse.Type = MessageType.Text;
                saveResponse.Content = responceText;
            }

            await chatService.UpdateChat(chat.Id, saveRequest, saveResponse);
            await AddTitle(chat.Id, responceText);

            return new MessageData
            {
                ChatId = chat.Id,
                Content = saveResponse.Content,
                Type = saveResponse.Type
            };
        }

        private async Task<string> AddTitle(string chatId, string message)
        {
            var chat = await chatRepo.GetByIdAsync(chatId);
            ArgumentNullException.ThrowIfNull(chat);

            var messages = new List<ChatMessage>
            {
                new SystemChatMessage(Completions.TitleGenerationPrompt),
                new UserChatMessage(message)
            };

            var response = await client.CompleteChatAsync(messages);

            chat.Title = response.Value.Content[0].Text;

            await chatRepo.UpdateAsync(chat);

            return chat.Title;
        }
    }
}
