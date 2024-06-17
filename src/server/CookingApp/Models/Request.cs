namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Request : MongoEntity
    {
        [BsonElement("message")]
        public string Message { get; set; }

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; }
    }
}