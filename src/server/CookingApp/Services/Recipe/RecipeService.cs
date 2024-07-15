using OpenAI.Chat;

namespace CookingApp.Services.Recipe
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Models;
    using Models.Entities;
    using CookingApp.Infrastructure.Interfaces;
    using Newtonsoft.Json;
    using CookingApp.Services.Image;

    public class RecipeService(ChatClient client, IRepository<Recipe> repo, IImageService imageService) : IRecipeService
    {
        ///<inheritdoc/>
        public async Task<string> CreateRecipe(string request, string userId)
        {
            var messages = new List<ChatMessage>
            {
                new SystemChatMessage(Completions.BuildRecipeConvertSystemMessage()),
                new UserChatMessage(request)
            };
            var chatOpts = new ChatCompletionOptions()
            {
                ResponseFormat = ChatResponseFormat.JsonObject
            };
            var response = await client.CompleteChatAsync(messages, chatOpts);
            var recipe = JsonConvert.DeserializeObject<Recipe>(response.Value.Content[0].Text);

            if (recipe is null)
            {
                throw new InvalidRecipeRequestException();
            }
            recipe.ImageUrl = await imageService.GenerateImage(recipe.Title);
            recipe.UserId = userId;

            await repo.InsertAsync(recipe);

            return recipe.Id;
        }

        public async Task<IEnumerable<Recipe>> GetAll(string userId)
        {
            return await repo.GetAllAsync(a => a.UserId == userId);
        }

        ///<inheritdoc/>
        public async Task<Recipe> GetById(string recipeId)
        {
            var recipe = await repo.GetByIdAsync(recipeId);
            if (recipe is null)
            {
                throw new NotFoundException();
            }

            return recipe;
        }
    }
}
