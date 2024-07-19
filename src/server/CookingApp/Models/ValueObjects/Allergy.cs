namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Allergy : ValueObject
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("severity")]
        public AllergySeverity Severity { get; set; }
    }
}