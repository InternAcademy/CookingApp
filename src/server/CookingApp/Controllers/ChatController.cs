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
        [HttpPost("new-chat")]
        public async Task<IActionResult> NewChat([FromBody] NewChatRequest request)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var response = await messageService.CreateMessage(userId, request.Message);

            var saveChatRequest = new SaveChatRequest
            {
                UserId = userId,
                Requests = [new Request { Message = request.Message, Owner = userId }],
                Responses = [new Response { Message = response.First().Message.Content, Owner = userId }]
            };

            var Chat = await chatService.SaveChat(saveChatRequest);
            var result = new ChatCreationResponse
            {
                ChatId = Chat.Id,
                Title = Chat.Title,
                Response = response.First().Message.Content
            };

            return Ok(result);
        }

        [HttpPost("continue/{chatId}")]
        public async Task<IActionResult> ContinueChat(string chatId, [FromBody] string message)
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

            return Ok(responce);
        }

        [HttpGet("c/{chatId}")]
        public async Task<IActionResult> ChatId(string chatId)
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
