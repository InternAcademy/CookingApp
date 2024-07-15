namespace CookingApp.Models.Entities
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson;
    using System.ComponentModel.DataAnnotations;

    public class Feedback : MongoEntity
    {
        [BsonElement("title")]
        //[MaxLength(50)] //it doesn't work on this level.
        //[MinLength(5)]
        public string Title { get; set; } = default!;

        [BsonElement("content")]
        //[MaxLength(10000)]
        //[MinLength(10)]
        public string Content { get; set; } = default!;

        [BsonElement("userId")]
        public string UserId { get; set; } = default!;
    }
}
