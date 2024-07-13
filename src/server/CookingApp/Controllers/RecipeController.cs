using CookingApp.Common.Helpers.Profiles;
using CookingApp.Models.Entities;
using CookingApp.Services.Recipe;
using CookingApp.ViewModels.Api;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    [ApiController]
    public class RecipeController(IRecipeService recipeService, IHttpContextAccessor httpContext) : ControllerBase
    {
        [HttpPost("create-recipe")]
        public async Task<IActionResult> CreateRecipe([FromBody] string request)
        {
            var recipeId = await recipeService.CreateRecipe(request, GetUser.ProfileId(httpContext));

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

        [HttpGet("recipes/{userId}")]
        public async Task<IActionResult> Recipes(string userId)
        {
            return new ApiResponse<IEnumerable<Recipe>>()
            {
                Status = 200,
                Data = await recipeService.GetAll(userId)
            };
        }
    }
}
