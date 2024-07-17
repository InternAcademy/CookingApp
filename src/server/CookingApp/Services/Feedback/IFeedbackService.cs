namespace CookingApp.Services.Feedback
{
    using CookingApp.Models.Entities;
    using CookingApp.ViewModels.Feedback;

    public interface IFeedbackService
    {
        Task<Feedback> CreateFeedbackAsync(CreateFeedback feedback);
        Task<Feedback> GetFeedbackByIdAsync(string id);
        Task<List<Feedback>> GetAllFeedbacksByUserIdAsync(string userId);
        Task<List<Feedback>> GetAllFeedbacksAsync();
    }
}
