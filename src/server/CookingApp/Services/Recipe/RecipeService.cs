using Newtonsoft.Json;
using OpenAI.Chat;

namespace CookingApp.Services.Recipe
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Models;
    using Models.Entities;
    public class RecipeService(ChatClient client) : IRecipeService
    {
        public async Task<Recipe?> TryConvertToRecipe(string request)
        {
            var messages = new List<ChatMessage>
            {
                new SystemChatMessage(Completions.BuildRecipeConvertSystemMessage())
            };
            messages.Add(new UserChatMessage(request));
            var chatOpts = new ChatCompletionOptions()
            {
                ResponseFormat = ChatResponseFormat.JsonObject
            };
            var response = await client.CompleteChatAsync(messages, chatOpts);
            var recipe = JsonConvert.DeserializeObject<Recipe>(response.Value.Content[0].Text);

            return recipe;
        }
    }
}
