namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Allergy : MongoEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("severity")]
        public AllergySeverity Severity { get; set; }
    }
}