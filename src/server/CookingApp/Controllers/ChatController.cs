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
        IMessageService openAIService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageData message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await openAIService.SendMessage(userId, message);

            return new ApiResponse<MessageData>()
            {
                Status = 200,
                Data = responce
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