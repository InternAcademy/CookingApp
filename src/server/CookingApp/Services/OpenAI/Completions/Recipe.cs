namespace CookingApp.Services.OpenAI.Completions
{
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels;
    using global::OpenAI.Interfaces;
    using CookingApp.Infrastructure.Interfaces;
    using MongoDB.Bson;
    using CookingApp.Models;
    using CookingApp.Common.CompletionConstants;

    /// <summary>
    /// This class it to assist with the personal needs of the user. 
    /// After defining their dietary/allergic needs the chat completion 
    /// will fill them in for the chatbot to take into account.
    /// </summary>
    public class Recipe
    {
        // field for UserSettingsDbService
        // field for userManagerService
        private readonly IRepository<RecipeModel> _repository;
        private readonly IOpenAIService _openAIService;

        public Recipe(IOpenAIService openAIService, IRepository<RecipeModel> repository)
        {
            _openAIService = openAIService;
            _repository = repository;
        }

        public async Task<string> CreateCompletion(string message)
        {
            // var user = await _userManager.GetUser();
            // var userAllergies = await _userSettings.Where(x => x.UserId == user.Id).Select(x => x.Allergies).ToListAsync();

            var userAllergies = new List<string> { "peanuts", "almonds", "eggs" };

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
                    ChatMessage.FromUser(message)
                },
                Model = Models.Gpt_4o,
            });
            if (completionResult.Successful)
            {
                await _repository.InsertAsync(new RecipeModel());
                return completionResult.Choices.First().Message.Content;
            }

            return null;
        }
    }
}
