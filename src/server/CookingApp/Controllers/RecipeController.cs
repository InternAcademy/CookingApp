using CookingApp.Models.Entities;
using CookingApp.Services.Recipe;
using CookingApp.ViewModels.Api;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    [ApiController]
    public class RecipeController(IRecipeService recipeService) : ControllerBase
    {
        [HttpPost("create-recipe")]
        public async Task<IActionResult> CreateRecipe([FromBody] string request)
        {
            var recipeId = await recipeService.CreateRecipe(request);

            return new ApiResponse<string>()
            {
                Status = 200,
                Data = recipeId
            };
        }

        [HttpGet("r/{recipeId}")]
        public async Task<IActionResult> RecipeById(string recipeId)
        {
            return new ApiResponse<Recipe>()
            {
                Status = 200,
                Data = await recipeService.GetById(recipeId)
            };
        }
    }
}
