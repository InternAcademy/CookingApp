namespace CookingApp.Services.Feedback
{
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models.Entities;
    using CookingApp.ViewModels.Feedback;
    using Microsoft.AspNetCore.Http;


    public class FeedbackService(
        IRepository<Feedback> feedbackRepo,
        IHttpContextAccessor httpContextAccessor) : IFeedbackService
    {
        public async Task<Feedback> CreateFeedbackAsync(CreateFeedback createFeedback)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            Feedback feedback = new Feedback()
            {
                Title = createFeedback.Title,
                Content = createFeedback.Content,
                UserId = userId
            };

            await feedbackRepo.InsertAsync(feedback);

            return feedback;
        }

        public Task<List<Feedback>> GetAllFeedbacksAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Feedback>> GetAllFeedbacksByUserIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<Feedback> GetFeedbackByIdAndUserIdAsync(string id, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<Feedback> GetFeedbackByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
