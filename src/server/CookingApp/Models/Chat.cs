namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Chat : MongoEntity
    {
        [BsonElement("external-id")]
        public string ExternalId { get; set; } = default!;

        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("user-id")]
        public string UserId { get; set; } = default!;

        [BsonElement("requests")]
        public List<Request> Requests { get; set; } = default!;

        [BsonElement("responses")]
        public List<Response> Responses { get; set; } = default!;
    }
}