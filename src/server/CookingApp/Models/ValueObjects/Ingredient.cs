namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Ingredient : ValueObject
    {
        [BsonElement("quantity")]
        public string Quantity { get; set; }

        [BsonElement("metric")]
        public string Metric { get; set; } = default!;

        [BsonElement("name")]
        public string Name { get; set; } = default!;
    }
}
