namespace CookingApp.Services.Feedback
{
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.ViewModels.Feedback;
    using CookingApp.Models.Entities;

    public class FeedbackService(
        IRepository<Feedback> feedbackRepo,
        IHttpContextAccessor httpContextAccessor) : IFeedbackService
    {
        public async Task<Feedback> CreateFeedbackAsync(CreateFeedback createFeedback)
        {
            var userId = GetUser.ProfileId(httpContextAccessor);

            var feedback = new Feedback()
            {
                Title = createFeedback.Title,
                Content = createFeedback.Content,
                UserId = userId
            };

            await feedbackRepo.InsertAsync(feedback);

            return feedback;
        }

        public async Task<List<Feedback>> GetAllFeedbacksAsync() 
            =>  await feedbackRepo.GetAllAsync();


        public async Task<List<Feedback>> GetAllFeedbacksByUserIdAsync(string userId)
            => await feedbackRepo.GetAllAsync(f => f.UserId == userId); 
        

        public async Task<Feedback> GetFeedbackByIdAsync(string id)
         =>  await feedbackRepo.GetFirstOrDefaultAsync(f => f.Id == id);
            
    }
}
