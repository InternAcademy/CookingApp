using System.ComponentModel.DataAnnotations;
using static CookingApp.Common.EntityConstants.ValidationConstants.CreateFeedback;

namespace CookingApp.ViewModels.Feedback
{
    public class CreateFeedback
    {
        [MaxLength(TitleMaxLength)]
        [MinLength(TitleMinLength)]
        public string Title { get; set; } = default!;

        [MaxLength(ContentMaxLength)]
        [MinLength(ContentMinLength)]
        public string Content { get; set; } = default!;
    }
}
