namespace CookingApp.Services.OpenAI
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.Models.Enums;
    using CookingApp.Services.ChatService;
    using CookingApp.ViewModels.Chat;
    using global::OpenAI.Chat;
    using System;

    public class OpenAIService(ChatClient client,
        IChatService chatService,
        IRepository<Chat> chatRepo,
        IRepository<UserProfile> profileRepo) : IOpenAIService
    {
        public async Task<OpenAIResponse> SendMessage(string userId, MessageModel message, string? chatId)
        {
            var chat = new Chat();
            if (chatId == null)
                chat = await chatService.CreateChat(userId);
            else
                chat = await chatRepo.GetByIdAsync(chatId);
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

            switch (message.Type)
            {
                case MessageType.Text:
                    messages.Add(new UserChatMessage(message.Content));
                    break;
                case MessageType.ImageURL:
                    messages.Add(new UserChatMessage(
                        ChatMessageContentPart.CreateTextMessageContentPart(Completions.ImageRequest),
                        ChatMessageContentPart.CreateImageMessageContentPart(new Uri(message.Content))
                    ));
                    break;
            }

            var response = await client.CompleteChatAsync(messages);

            await AddTitle(chat.Id, response.Value.Content[0].Text);

            return new OpenAIResponse
            {
                ChatId = chat.Id,
                ChatCompletion = response
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
