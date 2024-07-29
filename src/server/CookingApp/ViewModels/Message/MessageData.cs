namespace CookingApp.ViewModels.Message
{
    using CookingApp.Common.EntityConstants;
    using CookingApp.Models.Enums;
    using System.ComponentModel.DataAnnotations;

    public class MessageData
    {
        public MessageType Type { get; set; } = default!;

        [MaxLength(ValidationConstants.MessageRequests.ContentMaxLength)]
        public string Content { get; set; } = default!;
        public string? ChatId { get; set; }
    }
}
