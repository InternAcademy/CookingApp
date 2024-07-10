using CookingApp.Models.Entities;
using CookingApp.Services.Recipe;

namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Models;
    using CookingApp.Services.ChatService;
    using CookingApp.Services.OpenAI;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Chat;
    using CookingApp.ViewModels.Message;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class ChatController(IChatService chatService,
        IRecipeService recipeService,
        IMessageService openAIService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromForm] MessageRequest message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var response = await openAIService.SendMessage(userId, message);

            return new ApiResponse<MessageResponse>()
            {
                Status = 200,
                Data = response
            };
        }
        [HttpPost("convert")]
        public async Task<IActionResult> ConvertRecipe([FromBody] string request)
        {
            var recipe = await recipeService.TryConvertToRecipe(request);

            return new ApiResponse<Recipe>()
            {
                Status = 200,
                Data = recipe
            };
        }



        [HttpGet("c/{chatId}")]
        public async Task<IActionResult> ChatById(string chatId)
        {
            return new ApiResponse<Chat>()
            {
                Status = 200,
                Data = await chatService.GetById(chatId)
            };
        }

        [HttpGet("user-chats/{userId}")]
        public async Task<IActionResult> ChatsByUser(string userId)
        {
            return new ApiResponse<IEnumerable<ChatDataResponse>>()
            {
                Status = 200,
                Data = await chatService.GetActiveUserChats(userId)
            };
        }
    }
}