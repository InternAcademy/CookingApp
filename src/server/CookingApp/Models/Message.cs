namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Message : ValueObject
    {
        [BsonElement("type")]
        public MessageType Type { get; set; } = default!;

        [BsonElement("content")]
        public string Content { get; set; } = default!;

        [BsonElement("date-time")]
        public DateTime DateTime { get; set; } = default!;
    }
}