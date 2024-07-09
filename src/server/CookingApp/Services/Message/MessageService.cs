namespace CookingApp.Services.Message
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Models.Enums;
    using CookingApp.Services.ChatService;
    using CookingApp.Services.File;
    using CookingApp.Services.OpenAI;
    using CookingApp.ViewModels.Message;
    using global::OpenAI.Chat;
    using System;
    using System.Text.RegularExpressions;

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
                var imgPath = await UploadFile.ToImgur(ConvertDataUriToFormFile(request.Content), httpClient);

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
            saveResponse.Content = response.Value.Content[0].Text;

            await chatService.UpdateChat(chat.Id, saveRequest, saveResponse);
            await AddTitle(chat.Id, response.Value.Content[0].Text);

            return new MessageData
            {
                ChatId = chat.Id,
                Content = response.Value.Content[0].Text,
                Type = MessageType.Text
            };
        }

        public IFormFile ConvertDataUriToFormFile(string dataUri)
        {
            var match = ContentType().Match(dataUri);
            if (!match.Success)
            {
                throw new ArgumentException("Invalid data URI");
            }

            string contentType = match.Groups["type"].Value;
            string base64Data = match.Groups["data"].Value;

            byte[] fileBytes = Convert.FromBase64String(base64Data);

            var memoryStream = new MemoryStream(fileBytes);
            var file = new FormFile(memoryStream, 0, fileBytes.Length, string.Empty, "file")
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };

            return file;
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

        [GeneratedRegex(@"data:(?<type>.*?);base64,(?<data>.*)")]
        private static partial Regex ContentType();
    }
}
