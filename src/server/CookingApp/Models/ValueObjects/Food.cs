namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Food : ValueObject
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("type")]
        public FoodType Type { get; set; }
    }
}