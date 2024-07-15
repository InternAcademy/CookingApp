using System.ComponentModel.DataAnnotations;

namespace CookingApp.ViewModels.Feedback
{
    public class CreateFeedback
    {
        [MaxLength(50)]
        [MinLength(5)]
        public string Title { get; set; } = default!;

        [MaxLength(10000)]
        [MinLength(10)]
        public string Content { get; set; } = default!;
    }
}
