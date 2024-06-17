namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Chat : MongoEntity
    {
        [BsonElement("ApiGeneratedId")]
        public string ApiGeneratedId { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("createdTime")]
        public DateTime CreatedTime { get; set; }

        [BsonElement("requests")]
        public List<Request> Requests { get; set; } = new List<Request>();

        [BsonElement("responses")]
        public List<Response> Responses { get; set; } = new List<Response>();
    }
}