namespace CookingApp.Services.ChatService
{
    using global::OpenAI.Interfaces;
    using global::OpenAI.ObjectModels;
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels.ResponseModels;
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Common;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models.DTOs;
    using CookingApp.Models;
    using System.Text.Json;

    public class ChatService : IChatService
    {
        private readonly IRepository<Chat> _chatRepo;
        private readonly ILogger<ChatService> _logger;
        private readonly IOpenAIService _openAIService;

        public ChatService(
            IRepository<Chat> chatRepository,
            IOpenAIService openAIService,
            ILogger<ChatService> logger)
        {
            _chatRepo = chatRepository;
            _openAIService = openAIService;
            _logger = logger;
        }

        public async Task InsertAsync(CreateChatDTO chatModel)
        {
            var chat = new Chat()
            {
                ApiGeneratedId = chatModel.ApiGeneratedId,
                Title = chatModel.Title,
                UserId = chatModel.UserId,
                CreatedDateTime = DateTime.UtcNow,
                Requests = chatModel.Requests,
                Responses = chatModel.Responses
            };

            await _chatRepo.InsertAsync(chat);
        }

        public async Task<List<Chat>> GetAllChatsAsync()
            => await _chatRepo.GetAllAsync();

        public async Task<List<Tuple<string, string>>> GetAllByUserId(string userId)
        {
            var result = await _chatRepo.GetAllAsync(c => c.UserId == userId);
            return result.OrderBy(c => c.CreatedDateTime).Select(c => Tuple.Create(c.Title, c.ApiGeneratedId)).ToList();
        }

        public async Task<Chat?> GetByIdAsync(string id)
            => await _chatRepo.GetFirstOrDefaultAsync(c => c.Id == id);

        public async Task<Chat?> GetByApiGenIdAsync(string id)
            => await _chatRepo.GetFirstOrDefaultAsync(c => c.ApiGeneratedId == id);

        public async Task UpdateAsync(Chat chat)
            => await _chatRepo.UpdateAsync(chat);

        public async Task UpdateTitle(string id, string newTitle)
        {
            var chat = await GetByApiGenIdAsync(id);
            chat.Title = newTitle;

            await _chatRepo.UpdateAsync(chat);
        }

        public async Task<int> DeleteAsync(string id)
        {
            try
            {
                var chat = await GetByApiGenIdAsync(id);
                if (chat != null)
                {
                    _logger.LogInformation(SuccessMessages.ChatService.DeleteOperationSuccess);
                    await _chatRepo.DeleteAsync(chat);
                    return 1;
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ExceptionMessages.ChatService.DeleteOperationFail);
                _logger.LogError(ex.Message);
            }

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

                if (completionResult.Successful)
                {

                    // Creates a new Chat where later interaction will be stored
                    //var userChat = CreateNewChat(completionResult, userId);

                    // Testing purposes
                    var userChat = CreateNewChat(completionResult, request, "a1b2c3");
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
                var userChat = await GetByApiGenIdAsync(chatId);

                var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
                {
                    Messages = new List<ChatMessage>
                    {
                        ChatMessage.FromUser(request)
                    },
                    Model = Models.Gpt_3_5_Turbo_0125,
                    MaxTokens=5,
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

        // Creates a new chat using the ID originating from the ChatGPT API
        private async Task CreateNewChat(ChatCompletionCreateResponse completionResult, string request, string userId)
        {
            // send another ChatGPT API Request to config the title. 
            var title = await GenerateTitle(completionResult.Choices.First().Message.Content);

            var requests = new List<Request>();
            var requestModel = CreateNewRequest(request);
            requests.Add(requestModel);

            var responses = new List<Response>();
            var response = CreateNewResponse(completionResult.Choices.First().Message.Content);
            responses.Add(response);

            var chat = new CreateChatDTO()
            {
                ApiGeneratedId = completionResult.Id,
                UserId = userId,
                Title = title,
                Requests = requests,
                Responses = responses
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
                    ChatMessage.FromSystem(Completions.AssistantCreateTitleInstructions),
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

        //private static bool ChatExists(string chatId, User? user)
        //    => user.Chats.Any(x => x.Id == chatId);

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
    }
}
