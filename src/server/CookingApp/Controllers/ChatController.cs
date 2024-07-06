namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Models;
    using CookingApp.Models.Enums;
    using CookingApp.Services.ChatService;
    using CookingApp.Services.OpenAI;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Chat;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System;

    [ApiController]
    public class ChatController(IChatService chatService,
        IOpenAIService openAIService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpPost("chat")]
        public async Task<IActionResult> ContinueChat(MessageModel message, string? chatId)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await openAIService.SendMessage(userId, message, chatId);
            var chat = await chatService.UpdateChat(responce.ChatId, new Message
            {
                Content = message.Content,
                DateTime = DateTime.Now,
                Type = MessageType.Text
            }, new Message
            {
                Content = responce.ChatCompletion.Content[0].Text,
                DateTime = DateTime.Now,
                Type = MessageType.Text
            });

            return new ApiResponse<MessageResponse>()
            {
                Status = 200,
                Data = new MessageResponse
                {
                    ChatId = chat.Id,
                    Title = chat.Title,
                    Content = responce.ChatCompletion.Content[0].Text
                }
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
            return new ApiResponse<IEnumerable<ContentResponse>>()
            {
                Status = 200,
                Data = await chatService.GetActiveUserChats(userId)
            };
        }
    }
}