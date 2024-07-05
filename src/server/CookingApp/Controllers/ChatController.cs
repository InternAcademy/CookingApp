using CookingApp.Common.Helpers.Recipes;
using CookingApp.Models.Entities;
using Newtonsoft.Json;

namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Models;
    using CookingApp.Services.ChatService;
    using CookingApp.ViewModels.Chat;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using OpenAI.ObjectModels.SharedModels;
    using System;
    using System.Text.RegularExpressions;
    using IMessageService = Services.Message.IMessageService;
    using Request = Models.Request;
    using Response = Models.Response;

    [ApiController]
    public class ChatController(IChatService chatService,
        IMessageService messageService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpPost("new-chat/{message}")]
        public async Task<IActionResult> NewChat(string message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await messageService.CreateMessage(userId, message);

            var saveChatRequest = new SaveChatRequest
            {
                UserId = userId,
                Requests = [new Request { Message = message, Owner = userId }],
                Responses = [new Response { Message = responce.First().Message.Content, Owner = userId }]
            };

            var chat = await chatService.SaveChat(saveChatRequest);

            var result = new ViewModels.Chat.MessageResponse
            {
                ChatId = chat.Id,
                Title = chat.Title,
                Content = responce.First().Message.Content
            };

            var json = JsonConvert.DeserializeObject<Recipe>(result.Content);
            return Ok(result);
        }

        [HttpPost("continue/{chatId}/{message}")]
        public async Task<IActionResult> ContinueChat(string chatId, string message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await messageService.SendMessage(chatId, message);

            var saveChatRequest = new SaveChatRequest
            {
                ExternalId = responce.Chat.Id,
                UserId = userId,
                Requests = responce.Chat.Requests,
                Responses = responce.Chat.Responses
            };

            saveChatRequest.Requests
                .Add(new Request
                {
                    Message = message,
                    Owner = userId
                });

            saveChatRequest.Responses
                .Add(new Response
                {
                    Message = responce.ChatChoiceResponses.First().Message.Content,
                    Owner = userId
                });

            await chatService.SaveChat(saveChatRequest);

            var result = new ViewModels.Chat.MessageResponse
            {
                ChatId = responce.Chat.Id,
                Title = responce.Chat.Title,
                Content = responce.ChatChoiceResponses.First().Message.Content
            };

            return Ok(result);
        }

        [HttpGet("c/{chatId}")]
        public async Task<IActionResult> ChatById(string chatId)
        {
            return Ok(await chatService.GetById(chatId));
        }

        [HttpGet("user-chats/{userId}")]
        public async Task<IActionResult> ChatsByUser(string userId)
        {
            return Ok(await chatService.GetActiveUserChats(userId));
        }
    }
}