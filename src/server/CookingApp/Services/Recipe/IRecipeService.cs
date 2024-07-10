namespace CookingApp.Services.Recipe
{
    using Models.Entities;
    public interface IRecipeService
    {
        Task<Recipe?> TryConvertToRecipe(string request);
    }
}
