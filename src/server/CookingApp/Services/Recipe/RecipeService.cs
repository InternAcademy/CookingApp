﻿using OpenAI.Chat;

namespace CookingApp.Services.Recipe
{
    using CookingApp.Common.CompletionConstants;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Models;
    using Models.Entities;
    using CookingApp.Infrastructure.Interfaces;
    using Newtonsoft.Json;
    public class RecipeService(ChatClient client, IRepository<Recipe> repo) : IRecipeService
    {
        ///<inheritdoc/>
        public async Task<string> CreateRecipe(string request)
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

            await repo.InsertAsync(recipe);
            var id = (await repo.GetFirstOrDefaultAsync(r => r.Title == recipe.Title))!.Id;

            return id;
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
