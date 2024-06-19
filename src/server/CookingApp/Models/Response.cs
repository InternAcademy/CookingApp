namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Response : MongoEntity
    {
        [BsonElement("message")]
        public string Message { get; set; } = default!;

        [BsonElement("owner")]
        public string Owner { get; set; } = default!;
    }
}