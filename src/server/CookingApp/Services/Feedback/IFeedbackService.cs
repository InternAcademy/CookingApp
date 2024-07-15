namespace CookingApp.Services.Feedback
{
    using CookingApp.Models.Entities;
    using CookingApp.ViewModels.Feedback;

    public interface IFeedbackService
    {
        Task<Feedback> CreateFeedbackAsync(CreateFeedback feedback);
        //Task<List<Feedback>> GetFeedbacksByTitleAsync(string title);
        Task<Feedback> GetFeedbackByIdAsync(int id);
        Task<Feedback> GetFeedbackByIdAndUserIdAsync(string id, string userId);
        Task<List<Feedback>> GetAllFeedbacksByUserIdAsync(string userId);
        Task<List<Feedback>> GetAllFeedbacksAsync();
    }
}
