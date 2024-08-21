using System.Text.RegularExpressions;
using CookingApp.Infrastructure.Enums;
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
            string pattern = @"Title:\s(?<title>[A-Za-z ]+)";

            var match = Regex.Match(request, pattern);
            if (!match.Success)
            {
                throw new InvalidRecipeRequestException();
            }
            var title = match.Groups["title"].Value.TrimEnd();
            if (await repo.ExistsAsync(r => r.Title == title))
            {
                throw new RecipeAlreadyGeneratedException("You already generated a meal for this recipe");
            }
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
            recipe.IsArchived = false;

            await repo.InsertAsync(recipe);

            return recipe.Id;
        }

        public async Task<IPagedList<Recipe>> GetMine(string userId, int pageIndex, int pageSize = 10, string? title = null, bool includeDeleted = false)
        {
            return await repo.GetPagedListAsync(
                pageIndex, 
                pageSize, 
                r => r.UserId == userId && (title == null || r.Title.ToLower().Contains(title.ToLower())),
                null,
                SortDirection.Descending,
                includeDeleted);
        }

        public async Task ArchiveRecipe(string recipeId)
        {
            var recipe = await GetById(recipeId);
            recipe.IsArchived=!recipe.IsArchived;
            await repo.UpdateAsync(recipe);
        }

        public async Task DeleteRecipe(string recipeId)
        {
            var recipe = await GetById(recipeId);

            await repo.DeleteAsync(recipe);
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

        public async Task<IEnumerable<Recipe>> GetArchived(string userId)
        {
           return await repo.GetAllAsync(a => a.UserId == userId && a.IsArchived );
        }
    }
}
