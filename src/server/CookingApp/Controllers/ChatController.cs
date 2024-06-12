namespace CookingApp.Controllers
{
    using CookingApp.Common;
    using CookingApp.Services.ChatHistory;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [AllowAnonymous]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly ILogger<ChatController> _logger;

        public ChatController(IChatService chatService, ILogger<ChatController> logger)
        {
            _chatService = chatService;
            _logger = logger;
        }

        [HttpGet("chats")]
        public async Task<IActionResult> GetChats()
        {
            //TODO: implement Azure Entra Id functions
            //var user = _userService.GetUser();
            var chats = await _chatService.GetAllByUserId("user.Id");
            return Ok(chats);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat([FromQuery] string id)
        {
            _logger.LogInformation(TaskInformationMessages.ChatService.DeleteUserChatAttempt);
            var result = await _chatService.DeleteAsync(id);
            if (result == 0) return BadRequest();
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> SendQuery([FromBody] string message, [FromHeader] string? chatId = null)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                _logger.LogInformation(TaskInformationMessages.ChatGPT.ConnectionAttempt);

                var result =
                    String.IsNullOrEmpty(chatId)
                    ? await _chatService.CreateChatAsync(message)
                    : await _chatService.UpdateChatAsync(message, chatId);

                if (result == null)
                {
                    _logger.LogError(ExceptionMessages.ChatGPT.ConnectionError);
                    _logger.LogError(ExceptionMessages.ChatGPT.ResponseError);

                    return NoContent();
                }

                _logger.LogInformation(SuccessMessages.ChatGPT.ResponseSuccess);
                
                // To display the message you need to get into result.Choices[0].Message.Content.
                // The chat id is also contained inside the result
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(ExceptionMessages.ChatGPT.ConnectionError);
                _logger.LogError($"{e.Message}");
            }

            return BadRequest();
        }
    }
}
