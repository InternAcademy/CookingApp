namespace CookingApp.Controllers
{
    using CookingApp.Common;
    using CookingApp.Services.OpenAI.Completions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using OpenAI.ObjectModels.ResponseModels;

    [ApiController]
    [AllowAnonymous]
    public class GPTController : ControllerBase
    {
        private readonly ICompletionService _completionService;
        private readonly ILogger<GPTController> _logger;

        public GPTController(ICompletionService completionService, ILogger<GPTController> logger)
        {
            _completionService = completionService;
            _logger = logger;
        }

        [HttpPost("chat-request")]
        [AllowAnonymous]
        public async Task<IActionResult> SendQuery([FromBody] string message, [FromHeader] string? chatId = null)
        {
            try
            {
                _logger.LogInformation("Attempting ChatGPT API connection.");

                var result = 
                    String.IsNullOrEmpty(chatId)
                    ? await _completionService.CreateCompletion(message) 
                    : await _completionService.UpdateCompletion(message, chatId);

                if (result == null)
                {
                    return BadRequest(ExceptionMessages.ResponseRequestFailed);
                }

                _logger.LogInformation("Successfully connected to ChatGPT API.");
                _logger.LogInformation("Response received.");
                // To display the message you need to get into result.Choices[0].Message.Content.
                // The chat id is also contained inside the result

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed attempt to contact ChatGPT API.");
                return BadRequest(ex.Message);
            }
        }
    }
}
