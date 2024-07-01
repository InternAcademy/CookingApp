namespace CookingApp.Controllers
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Services.ChatService;
    using CookingApp.ViewModels.Api;
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
        public async Task<ApiResponse<ChatCreationResponse>> NewChat([FromBody] NewChatRequest request)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var message = await messageService.CreateMessage(userId, request.Message);

            var saveChatRequest = new SaveChatRequest
            {
                UserId = userId,
                Requests = [new Request { Message = request.Message, Owner = userId }],
                Responses = [new Response { Message = message.First().Message.Content, Owner = userId }]
            };

            var Chat = await chatService.SaveChat(saveChatRequest);
            var data = new ChatCreationResponse
            {
                ChatId = Chat.Id,
                Title = Chat.Title,
                Response = message.First().Message.Content
            };

            ApiResponse<ChatCreationResponse> response = new ApiResponse<ChatCreationResponse>(){
                Status=200,
                Data=data
            };
            return response;
        }

        [HttpPost("continue")]
        public async Task<ApiResponse<ContinueChatResponse>> ContinueChat([FromBody] ContinueChatRequest request)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);
            var responce = await messageService.SendMessage(request.ChatId, request.Message);

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
                    Message = request.Message,
                    Owner = userId
                });

            saveChatRequest.Responses
                .Add(new Response
                {
                    Message = responce.ChatChoiceResponses.First().Message.Content,
                    Owner = userId
                });

            await chatService.SaveChat(saveChatRequest);
            ContinueChatResponse data = new ContinueChatResponse(responce.Chat.Responses.Last().Message);
            ApiResponse<ContinueChatResponse> response = new ApiResponse<ContinueChatResponse>(){
                Status=200,
                Data=data
            };
            return response;
        }

        [HttpGet("c/{chatId}")]
        public async Task<ApiResponse<ChatResponse>> ChatId(string chatId)
        {
            var chat = await chatService.GetById(chatId);

            ChatResponse chatDto = new ChatResponse()
            {
                Id=chat.Id,
                Title=chat.Title,
                Chat=new Dialog()
                {
                    Requests=chat.Requests.Select(req=>req.Message).ToList(),
                    Responses=chat.Responses.Select(res=>res.Message).ToList(),
                }
            };
            ApiResponse<ChatResponse> response = new ApiResponse<ChatResponse>()
            {
                Status=200,
                Data=chatDto
            };
            return response;
        }

        [HttpGet("user-chats/{userId}")]
        public async Task<IActionResult> ChatsByUser(string userId)
        {
            return Ok(await chatService.GetActiveUserChats(userId));
        }
    }
}
