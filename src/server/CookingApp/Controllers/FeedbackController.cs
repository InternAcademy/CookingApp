namespace CookingApp.Controllers
{
    using CookingApp.Models.Entities;
    using CookingApp.Services.Feedback;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Feedback;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("feedback")]
    public class FeedbackController(IFeedbackService feedbackService) : ControllerBase
    {
        [HttpPost("create")]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedback createFeedback)
        {
            Feedback createdFeedback
                = await feedbackService.CreateFeedbackAsync(createFeedback);

            return new ApiResponse<Feedback>()
            {
                Status = 200,
                Data = createdFeedback
            };
        }
        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var feedBack
                = await feedbackService.GetFeedbackByIdAsync(id);

            return new ApiResponse<Feedback>()
            {
                Status = 200,
                Data = feedBack
            };
        }
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var feedBacks
                = await feedbackService.GetAllFeedbacksAsync();

            return new ApiResponse<List<Feedback>>()
            {
                Status = 200,
                Data = feedBacks
            };
        }
        [HttpGet("get-all-by-user-id/{userId}")]
        public async Task<IActionResult> GetAllByUserId(string userId)
        {            
            var feedBacks
                = await feedbackService.GetAllFeedbacksByUserIdAsync(userId);

            return new ApiResponse<List<Feedback>>()
            {
                Status = 200,
                Data = feedBacks
            };
        }
    }
}
