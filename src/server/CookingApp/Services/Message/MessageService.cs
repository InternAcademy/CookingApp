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

    public partial class MessageService(ChatClient client,
        IChatService chatService,
        IRepository<Chat> chatRepo,
        IRepository<UserProfile> profileRepo,
        HttpClient httpClient) : IMessageService
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
            if (chat.Requests.Count > 0)
            {
                for (int i = 0; i < chat.Requests.Count; i++)
                {
                    messages.Add(new UserChatMessage(chat.Requests[i].Content));
                    messages.Add(new AssistantChatMessage(chat.Responses[i].Content));
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
                var imgPath = await UploadFile.ToImgur(File.ConvertDataUriToFormFile(request.Content), httpClient);

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
            var textResponse = MessageHelper.RemoveMarkdown(response.Value.Content[0].Text);
            saveResponse.Content = textResponse;
            saveResponse.Type = RecipeHelpers.IsRecipe(saveResponse.Content) ? MessageType.Recipe : MessageType.Text;

            await chatService.UpdateChat(chat.Id, saveRequest, saveResponse);
            await AddTitle(chat.Id, response.Value.Content[0].Text);

            return new MessageData
            {
                ChatId = chat.Id,
                Content = textResponse,
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
