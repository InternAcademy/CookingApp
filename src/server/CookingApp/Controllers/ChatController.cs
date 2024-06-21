namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Services.ChatService;
    using CookingApp.ViewModels.Chat;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using IMessageService = Services.Message.IMessageService;
    using Request = Models.Request;
    using Response = Models.Response;

    [ApiController]
    public class ChatController(IChatService chatService,
        IMessageService messageService,
        IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpGet("new-chat")]
        public async Task<IActionResult> NewChat([FromBody] string message)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await messageService.CreateMessage(userId, message);

            var saveChatRequest = new SaveChatRequest 
            {
                UserId = userId,
                Requests = [new Request { Message = message, Owner = userId}],
                Responses = [new Response { Message = responce.First().Message.Content, Owner = userId }]
            };

            await chatService.SaveChat(saveChatRequest);

            return Ok(responce);
        }

        [HttpGet("cid/{chatId}")]
        public async Task<IActionResult> ContinueChat(string chatId, [FromBody]string message)
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

            return Ok(responce.ChatChoiceResponses);
        }
    }
}
