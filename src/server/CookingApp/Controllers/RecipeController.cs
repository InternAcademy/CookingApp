using CookingApp.Common.Helpers.Profiles;
using CookingApp.Models.Entities;
using CookingApp.Models.Enums;
using CookingApp.Services.Limitation;
using CookingApp.Services.Recipe;
using CookingApp.ViewModels.Api;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using CookingApp.Infrastructure.Extensions;
using CookingApp.ViewModels.Recipes;

namespace CookingApp.Controllers
{
    [ApiController]
    public class RecipeController(IRecipeService recipeService,
        IHttpContextAccessor httpContext,
        ILimitationService limitationService) : ControllerBase
    {
        [HttpPost("create-recipe")]
        public async Task<IActionResult> CreateRecipe([FromBody] string request)
        {
            var userId = GetUser.ProfileId(httpContext);
            var limitationResult = await limitationService.ProcessUserRecipeLimitations(userId);
            if (limitationResult == ProcessResult.RecipeLimitationSuccessfull)
            {
                var recipeId = await recipeService.CreateRecipe(request, userId);

                return new ApiResponse<string>()
                {
                    Status = 200,
                    Data = recipeId
                };
            }

            return new ApiResponse<ProcessResult>()
            {
                Status = 403,
                Data = limitationResult
            };
        }

        [HttpPost("archive/{recipeId}")]
        public async Task<IActionResult> ArchiveRecipe(string recipeId)
        {
            await recipeService.ArchiveRecipe(recipeId);

            return new ApiResponse<string>()
            {
                Status = 200
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

        [HttpPost("recipes/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> Recipes(string userId,
            [Range(1, int.MaxValue, ErrorMessage = "Value must be greater than 0")]
            int pageIndex = 1,
            [Range(1, int.MaxValue, ErrorMessage = "Value must be greater than 0")]
            int pageSize = 10)
        {
            var result = await recipeService.GetMine(userId, pageIndex, pageSize);
            return new ApiResponse<RecipePage>()
            {
                Status = 200,
                Data = new RecipePage()
                {
                    Page = pageIndex,
                    Recipes = result.ToPage(),
                    TotalPages = 10
                }
            };
        }
        [HttpGet("archived-recipes/{userId}")]
        public async Task<IActionResult> ArchivedRecipes(string userId)
        {
            return new ApiResponse<IEnumerable<Recipe>>()
            {
                Status = 200,
                Data = await recipeService.GetArchived(userId)
            };
        }

        [HttpDelete("delete-recipe/{recipeId}")]
        public async Task<IActionResult> Delete(string recipeId)
        {
            await recipeService.DeleteRecipe(recipeId);

            return new ApiResponse<IActionResult>()
            {
                Status = 200,
                Data = Ok()
            };
        }
    }
}
