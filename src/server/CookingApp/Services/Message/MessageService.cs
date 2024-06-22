namespace CookingApp.Services.Message
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using OpenAI.Interfaces;
    using OpenAI.ObjectModels.RequestModels;
    using OpenAI.ObjectModels.SharedModels;
    using System;
    using System.Text;

    public class MessageService(
        IRepository<Chat> chatRepo,
        IRepository<UserProfile> profileRepo,
        IOpenAIService openAIService) : IMessageService
    {
        public async Task<List<ChatChoiceResponse>> GenerateTitle(Chat chat)
        {
            var titleContent = new StringBuilder();

            for (int i = 0; i < chat.Requests.Count - 1; i++)
            {
                titleContent.AppendLine("Request: " + chat.Requests[i]);
                titleContent.AppendLine("Response: " + chat.Responses[i]);
            }

            var titleRequest = new ChatCompletionCreateRequest
            {
                Messages =
                [
                    ChatMessage.FromSystem(Completions.TitleGenerationPrompt),
                    ChatMessage.FromUser(titleContent.ToString())
                ],
                MaxTokens = 10
            };
            return await SendCompletionRequest(titleRequest);
        }
        public async Task<List<ChatChoiceResponse>> CreateMessage(string userId, string message)
        {
            var userProfile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == userId);
            var completionRequest = BuildCompletionRequest(null, userProfile, message);
            return await SendCompletionRequest(completionRequest);
        }

        public async Task<ChatMessageResponce> SendMessage(string chatId, string message)
        {
            var chat = await chatRepo.GetByIdAsync(chatId);
            var userProfile = await profileRepo.GetFirstOrDefaultAsync(a => a.UserId == chat.UserId);

            var completionRequest = BuildCompletionRequest(chat, userProfile, message);

            return new ChatMessageResponce
            {
                Chat = chat,
                ChatChoiceResponses = await SendCompletionRequest(completionRequest)
            };
        }

        private async Task<List<ChatChoiceResponse>> SendCompletionRequest(ChatCompletionCreateRequest completionRequest)
        {
            var completion = await openAIService.ChatCompletion.CreateCompletion(completionRequest);
            if (completion.Successful)
            {
                return completion.Choices;
            }

            throw new ChatStuckException();
        }

        private ChatCompletionCreateRequest BuildCompletionRequest(Chat chat, UserProfile userProfile, string message)
        {
            var completionRequest = new ChatCompletionCreateRequest
            {
                Messages = [ChatMessage.FromSystem(Completions.BuildSystemMessage(userProfile))],
                MaxTokens = 500,
                N = 1
            };

            if (chat != null)
            {
                var requests = chat.Requests.Select(a => a.Message).ToList();
                var responses = chat.Responses.Select(a => a.Message).ToList();
                var interleavedMessages = InterleaveMessages(requests, responses);

                foreach (var m in interleavedMessages)
                {
                    completionRequest.Messages.Add(m);
                }
            }

            completionRequest.Messages.Add(ChatMessage.FromUser(message));

            return completionRequest;
        }

        private List<ChatMessage> InterleaveMessages(List<string> requests, List<string> responses)
        {
            var interleavedMessages = new List<ChatMessage>();
            int maxLength = Math.Max(requests.Count, responses.Count);
            for (int i = 0; i < maxLength; i++)
            {
                if (i < requests.Count)
                {
                    interleavedMessages.Add(ChatMessage.FromUser(requests[i]));
                }
                if (i < responses.Count)
                {
                    interleavedMessages.Add(ChatMessage.FromAssistant(responses[i]));
                }
            }

            return interleavedMessages;
        }
    }
}
