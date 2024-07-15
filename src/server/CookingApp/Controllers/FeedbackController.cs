namespace CookingApp.Controllers
{
    using CookingApp.Models.Entities;
    using CookingApp.Services.Feedback;
    using CookingApp.ViewModels.Feedback;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class FeedbackController(IFeedbackService feedbackService) : ControllerBase
    {
        [HttpPost("create-feedback")]
        public async Task<IActionResult> CreateFeedback([FromForm] CreateFeedback createFeedback)
        {
            Feedback createdFeedback
                = await feedbackService.CreateFeedbackAsync(createFeedback);

            return CreatedAtAction(nameof(CreateFeedback),
                new { id = createdFeedback.Id }, createdFeedback);
        }
    }
}
