namespace CookingApp.Services.OpenAI.Completions
{
    using global::OpenAI.Interfaces;
    using global::OpenAI.ObjectModels.ResponseModels;
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels;
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Interfaces;
    using System.Linq;

    /// <summary>
    /// This class it to assist with the personal needs of the user. 
    /// After defining their dietary/allergic needs the chat completion 
    /// will fill them in for the chatbot to take into account.
    /// </summary>
    public class CompletionService : ICompletionService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<Chat> _chatRepo;
        private readonly IOpenAIService _openAIService;

        public CompletionService(IOpenAIService openAIService, IRepository<User> userRepo, IRepository<Chat> chatRepo)
        {
            _openAIService = openAIService;
            _userRepo = userRepo;
            _chatRepo = chatRepo;
        }

        public async Task<ChatCompletionCreateResponse> CreateCompletion(string request)
        {
            //TODO: get the userId through JWT Bearer
            var user = await _userRepo.GetByIdAsync("userId");

            // Get the user allergies
            var userAllergies = user.Allergies;

            // Case if the converstaion is new and the chat doesn't exist
            var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<ChatMessage>
                {
                    // Creating a prompt for the chatboot to answer a question about cooking/diatery needs.
                    ChatMessage.FromSystem(Completions.Instructions
                                            + userAllergies + "."
                                            + Completions.PromptEngineeringPrevention),
                    ChatMessage.FromUser(Completions.Suggestion),
                    ChatMessage.FromAssistant(Completions.ExampleResponse),
                    ChatMessage.FromUser(request)
                },
                Model = Models.Gpt_4o
            });

            var userChat = CreateNewChat(completionResult.Id);

            if (completionResult.Successful)
            {
                var response = completionResult.Choices[0].Message.Content;
                UpdateUserChat(userChat, request, response);
                return completionResult;
            }

            return null;

        }

        public async Task<ChatCompletionCreateResponse> UpdateCompletion(string request, string? chatId = null)
        {
            var userChat = await _chatRepo.GetByIdAsync(chatId);

            var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<ChatMessage>
                {
                    ChatMessage.FromUser(request)
                },
                Model = Models.Gpt_4o
            });

            if (completionResult.Successful)
            {
                var response = completionResult.Choices[0].Message.Content;
                UpdateUserChat(userChat, request, response);
                return completionResult;
            }

            return null;
        }

        private static bool ChatExists(string chatID, User? user)
            => user.Chats.Any(x => x.Id == chatID);

        private Request CreateNewRequest(string message)
            => new Request()
            {
                Message = message,
                Timestamp = DateTime.UtcNow,
            };

        private Response CreateNewResponse(string message)
            => new Response()
            {
                Message = message,
                Timestamp = DateTime.UtcNow,
            };

        // Creates a new chat using the ID originating from the ChatGPT API
        private Chat CreateNewChat(string id)
        {
            var chat = new Chat()
            {
                Id = id,
                Requests = new List<Request>(),
                Responses = new List<Response>()
            };

            _chatRepo.InsertAsync(chat);

            return chat;
        }

        private async void UpdateUserChat(Chat? userChat, string? request, string? response)
        {
            userChat.Requests.Add(CreateNewRequest(request));
            userChat.Responses.Add(CreateNewResponse(response));
            await _chatRepo.UpdateAsync(userChat);
        }
    }
}
