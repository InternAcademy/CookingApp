namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Request : MongoEntity
    {
        [BsonElement("owner")]
        public string Owner { get; set; } = default!;

        [BsonElement("message")]
        public string Message { get; set; } = default!;
    }
}