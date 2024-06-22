namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Food : MongoEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("type")]
        public FoodType Type { get; set; }
    }
}