namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Limitations : ValueObject
    {
        [BsonElement("recipe-generation")]
        public int? RecipeGeneration { get; set; }

        [BsonElement("chat-from-date")]
        public DateTime? ChatFromDate { get; set; }

        [BsonElement("chat-generation")]
        public int? ChatGeneration { get; set; }
    }
}