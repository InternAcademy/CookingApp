namespace CookingApp.Services.OpenAI.Completions
{
    using global::OpenAI.Interfaces;
    using global::OpenAI.ObjectModels.ResponseModels;
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels;
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Interfaces;
    using System.Linq;
    using CookingApp.Services.ChatHistory;
    using MongoDB.Bson.Serialization;
    using System.Text.Json;

    /// <summary>
    /// This class it to assist with the personal needs of the user. 
    /// After defining their dietary/allergic needs the chat completion 
    /// will fill them in for the chatbot to take into account.
    /// </summary>
    public class CompletionService : ICompletionService
    {
        private readonly IRepository<User> _userRepo;
        private readonly ILogger _logger;
        private readonly IChatService _chatService;
        private readonly IOpenAIService _openAIService;

        public CompletionService(IOpenAIService openAIService,
            IRepository<User> userRepo,
            IChatService chatService,
            ILogger logger)
        {
            _openAIService = openAIService;
            _userRepo = userRepo;
            _chatService = chatService;
            _logger = logger;
        }

        public async Task<ChatCompletionCreateResponse> CreateCompletion(string request)
        {
            _logger.LogInformation("Attempting to find user");
            //TODO: get the userId through JWT Bearer
            //TODO: insert try-catch
            //var user = await _userRepo.GetByIdAsync("userId");

            // Get the user allergies
            //var userAllergies = user.Allergies;
            var userAllergies = new List<string> { "bananas", "oats", "peanuts" };

            // Case if the converstaion is new and the chat doesn't exist
            var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<ChatMessage>
                {
                    // Creating a prompt for the chatboot to answer a question about cooking/diatery needs.
                    ChatMessage.FromSystem(Completions.Instructions
                                            + userAllergies + "."
                                            + Completions.PromptEngineeringPrevention),
                    //ChatMessage.FromUser(Completions.Suggestion),
                    //ChatMessage.FromAssistant(Completions.ExampleResponse),
                    ChatMessage.FromUser(request)
                },
                Model = Models.Gpt_3_5_Turbo_0125,
                MaxTokens = 5,
                N = 1,
            });

            // Creates a new Chat where later interaction will be stored
            //var userChat = CreateNewChat(completionResult.Id);

            if (completionResult.Successful)
            {
                //var response = completionResult.Choices[0].Message.Content;
                //UpdateUserChat(userChat, request, response);
                return completionResult;
            }

            return null;

        }

        public async Task<ChatCompletionCreateResponse> UpdateCompletion(string request, string? chatId)
        {
            try
            {
                var userChat = await _chatService.GetByIdAsync(chatId);

                var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
                {
                    Messages = new List<ChatMessage>
                    {
                        ChatMessage.FromUser(request)
                    },
                    Model = Models.Gpt_3_5_Turbo_0125
                });

                if (completionResult.Successful)
                {
                    _logger.LogInformation("Successfully received a response from the ChatGPT API.");
                    // workout if info is needed inside the logger
                    _logger.LogInformation($"{JsonSerializer.Serialize(completionResult)}");
                    var response = completionResult.Choices[0].Message.Content;
                    UpdateUserChat(userChat, request, response);

                    return completionResult;
                }
            }
            catch (Exception e)
            {
                _logger.LogInformation("An error occurred while sending a query to ChatGPT API.");
                _logger.LogInformation(e.Message);
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
        private async Task<Chat> CreateNewChat(string id)
        {
            var chat = new Chat()
            {
                Id = id,
                Requests = new List<Request>(),
                Responses = new List<Response>()
            };

            await _chatService.InsertAsync(chat);

            return chat;
        }

        private async void UpdateUserChat(Chat? userChat, string? request, string? response)
        {
            userChat?.Requests.Add(CreateNewRequest(request));
            userChat?.Responses.Add(CreateNewResponse(response));
            await _chatService.UpdateAsync(userChat);
        }
    }
}
