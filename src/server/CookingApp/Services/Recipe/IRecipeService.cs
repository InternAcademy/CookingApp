namespace CookingApp.Services.Recipe
{
    using CookingApp.Infrastructure.Interfaces;
    using Models.Entities;

    public interface IRecipeService
    {
        /// <summary>
        /// Creates a new recipe from the given request string using OpenAI Chat to generate the recipe.
        /// </summary>
        /// <param name="request">The user input request string containing the recipe details.</param>
        /// <returns>The ID of the newly created recipe.</returns>
        /// <exception cref="InvalidRecipeRequestException">Thrown when the generated recipe is null or invalid.</exception>
        Task<string> CreateRecipe(string request, string userId);

        Task ArchiveRecipe(string recipeId);

        /// <summary>
        /// Retrieves a recipe by its ID.
        /// </summary>
        /// <param name="recipeId">The ID of the recipe to retrieve.</param>
        /// <returns>The Recipe entity matching the given ID.</returns>
        /// <exception cref="NotFoundException">Thrown when no recipe is found with the given ID.</exception>
        Task<Recipe> GetById(string recipeId);

        Task<IPagedList<Recipe>> GetMine(string userId, int pageIndex, int pageSize = 10, bool includeDeleted = false);
        Task<IEnumerable<Recipe>> GetArchived(string userId);
    }
}
