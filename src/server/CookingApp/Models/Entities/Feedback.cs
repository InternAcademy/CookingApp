namespace CookingApp.Models.Entities
{
    using MongoDB.Bson.Serialization.Attributes;
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson;

    public class Feedback : MongoEntity
    {
        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("content")]
        public string Content { get; set; } = default!;

        [BsonElement("userId")]
        public string UserId { get; set; } = default!;
    }
}
