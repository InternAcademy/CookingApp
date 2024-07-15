namespace CookingApp.Controllers
{
    using CookingApp.Models.Entities;
    using CookingApp.Services.Feedback;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Feedback;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    //[Authorize(Roles = "Admin")]
    [Route("feedback")]
    public class FeedbackController(IFeedbackService feedbackService) : ControllerBase
    {
        //[Authorize(Roles = "Admin, User")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateFeedback([FromForm] CreateFeedback createFeedback)
        {
            Feedback createdFeedback
                = await feedbackService.CreateFeedbackAsync(createFeedback);

            return new ApiResponse<Feedback>()
            {
                Status = 200,
                Data = createdFeedback
            };
        }
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById([FromHeader] string id)
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
        [HttpGet("get-all-by-user-id")]
        public async Task<IActionResult> GetAllByUserId([FromHeader] string userId)
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
