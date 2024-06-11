namespace CookingApp.Services.ChatHistory
{
    using global::OpenAI.Interfaces;
    using global::OpenAI.ObjectModels;
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels.ResponseModels;
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Common;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models.DTOs;
    using System.Text.Json;
    using CookingApp.Models;

    public class ChatService : IChatService
    {
        private readonly IRepository<Chat> _chatRepository;
        private readonly ILogger<ChatService> _logger;
        private readonly IOpenAIService _openAIService;
        private readonly IRepository<User> _userRepository;

        public ChatService(
            IOpenAIService openAIService,
            ILogger<ChatService> logger,
            IRepository<Chat> chatRepository,
            IRepository<User> userRepository)
        {
            _openAIService = openAIService;
            _logger = logger;
            _chatRepository = chatRepository;
            _userRepository = userRepository;
        }

        public async Task InsertAsync(CreateChatDTO chatModel)
        {
            var chat = new Chat()
            {
                Title = chatModel.Title,
                UserId = chatModel.UserId,
                Requests = new List<Request>(),
                Responses = new List<Response>()
            };

            await _chatRepository.InsertAsync(chat);
        }

        public async Task<List<Chat>> GetAllChatsAsync()
        => await _chatRepository.GetAllAsync();

        public async Task<List<Tuple<string, string>>> GetAllByUserId(string userId)
        {
            var result = await _chatRepository.GetAllAsync(c => c.UserId == userId);
            return result.OrderBy(c => c.CreatedDateTime).Select(c => Tuple.Create(c.Title, c.Id)).ToList();
        }

        public async Task<Chat?> GetByIdAsync(string id)
            => await _chatRepository.GetByIdAsync(id);

        public async Task UpdateAsync(Chat chat)
        => await _chatRepository.UpdateAsync(chat);

        public async Task<int> DeleteAsync(string id)
        {
            var chat = await _chatRepository.GetByIdAsync(id);
            if (chat != null)
            {
                _logger.LogInformation(SuccessMessages.ChatService.DeleteOperationSuccess);
                await _chatRepository.DeleteAsync(chat);
                return 1;
            }

            _logger.LogInformation(ExceptionMessages.ChatService.DeleteOperationFail);
            return 0;
        }

        public async Task<ChatCompletionCreateResponse> CreateChatAsync(string request)
        {
            try
            {
                _logger.LogInformation(TaskInformationMessages.ChatService.GetUserAttempt);
                //TODO: get the userId through JWT Bearer
                //var user = await _userRepo.GetByIdAsync("userId");

                // Get the user allergies
                //var userAllergies = user.Allergies;
                var userAllergies = new List<string> { "bananas", "oats", "peanuts" };

                // Case if the converstaion is new and the chat doesn't exist
                var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
                {
                    Messages = new List<ChatMessage>
                {
                    ChatMessage.FromSystem(Completions.AssistantInstructions
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
                //var userChat = CreateNewChat(completionResult);

                if (completionResult.Successful)
                {
                    _logger.LogInformation(SuccessMessages.ChatGPT.ResponseSuccess);
                    // workout if info is needed inside the logger
                    _logger.LogInformation($"{JsonSerializer.Serialize(completionResult)}");

                    return completionResult;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(ExceptionMessages.ChatGPT.ConnectionError);
                _logger.LogError($"{e.Message}");
            }

            return null;
        }

        public async Task<ChatCompletionCreateResponse> UpdateChatAsync(string request, string? chatId)
        {
            try
            {
                var userChat = await GetByIdAsync(chatId);

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
                    _logger.LogInformation(SuccessMessages.ChatGPT.ResponseSuccess);
                    // workout if info is needed inside the logger
                    _logger.LogInformation($"{JsonSerializer.Serialize(completionResult)}");
                    var response = completionResult.Choices[0].Message.Content;
                    UpdateUserChat(userChat, request, response);

                    return completionResult;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(ExceptionMessages.ChatGPT.ConnectionError);
                _logger.LogError(e.Message);
            }

            return null;
        }

        private static bool ChatExists(string chatId, User? user)
            => user.Chats.Any(x => x.Id == chatId);

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
        private async Task CreateNewChat(ChatCompletionCreateResponse completionResult, string userId)
        {
            // send another ChatGPT API Request to config the title. 
            var title = await GenerateTitle(completionResult.Choices.First().Message.Content);

            var chat = new CreateChatDTO()
            {
                Id = completionResult.Id,
                UserId = userId,
                Title = title,
                Requests = new List<Request>(),
                Responses = new List<Response>()
            };

            await InsertAsync(chat);
        }

        private async Task<string> GenerateTitle(string message)
        {
            try
            {
                var result = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
                {
                    Model = Models.Gpt_3_5_Turbo_0125,
                    Messages = new List<ChatMessage>
                {
                    ChatMessage.FromUser(message)
                },
                    MaxTokens = 10
                });

                if (result.Successful)
                {
                    return result.Choices.First().Message.Content;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(ExceptionMessages.ChatGPT.ConnectionError);
                _logger.LogError(e.Message);
            }

            return null;
        }

        private async void UpdateUserChat(Chat? userChat, string? request, string? response)
        {
            userChat?.Requests.Add(CreateNewRequest(request));
            userChat?.Responses.Add(CreateNewResponse(response));
            await UpdateAsync(userChat);
        }
    }
}
