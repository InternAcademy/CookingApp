namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Models;
    using CookingApp.Infrastructure.Extensions;
    using CookingApp.Models.Enums;
    using CookingApp.Services.ChatService;
    using CookingApp.Services.Limitation;
    using CookingApp.Services.OpenAI;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Message;
    using CookingApp.ViewModels.Recipes;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.ComponentModel.DataAnnotations;

    [ApiController]
    public class ChatController(IChatService chatService,
        IMessageService openAIService,
        ILimitationService limitationService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageData message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var limitationResult = await limitationService.ProcessUserMessageLimitations(userId);
            if(limitationResult == ProcessResult.MessageLimitationSuccessfull)
            {
                var response = await openAIService.SendMessage(userId, message);

                return new ApiResponse<MessageData>()
                {
                    Status = 200,
                    Data = response
                };
            }

            return new ApiResponse<ProcessResult>()
            {
                Status = 403,
                Data = limitationResult
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

        [HttpDelete("delete-chat/{chatId}")]
        public async Task<IActionResult> Delete(string chatId)
        {
            await chatService.DeleteChat(chatId);

            return new ApiResponse<IActionResult>()
            {
                Status = 200,
                Data = Ok()
            };
        }

        [HttpPost("user-chats/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> ChatsByUser(string userId, 
            [Range(1, int.MaxValue, ErrorMessage = "Value must be greater than 0")]
            int pageIndex = 1,
            [Range(1, int.MaxValue, ErrorMessage = "Value must be greater than 0")]
            int pageSize = 50)
        {
            var result = await chatService.GetActiveUserChats(userId, pageIndex, pageSize);
            return Ok(new ApiResponse<ChatPage>()
            {
                Status = 200,
                Data = new ChatPage()
                {
                    Page = pageIndex,
                    Chats = result.ToPage(),
                    TotalPages = result.TotalPages
                }
            });
        }
    }
}