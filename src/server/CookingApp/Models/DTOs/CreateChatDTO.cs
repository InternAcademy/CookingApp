namespace CookingApp.Models.DTOs
{
    using MongoDB.Bson.Serialization.Attributes;

    public class CreateChatDTO
    {
        public required string ApiGeneratedId { get; set; }

        public required string? Title { get; set; }

        public required string? UserId { get; set; }

        public DateTime CreatedTime { get; set; }

        public List<Request> Requests { get; set; } = new List<Request>();

        public List<Response> Responses { get; set; } = new List<Response>();
    }
}
