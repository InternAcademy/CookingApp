namespace CookingApp.Models.DTOs
{
    using MongoDB.Bson.Serialization.Attributes;

    public class CreateChatDTO
    {
        public string Id { get; set; }
        public string? Title { get; set; }

        public string? UserId { get; set; }

        public DateTime CreatedTime { get; set; }

        public List<Request> Requests { get; set; } = new List<Request>();

        public List<Response> Responses { get; set; } = new List<Response>();
    }
}
