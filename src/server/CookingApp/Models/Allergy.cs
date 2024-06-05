using CookingApp.Infrastructure.Common;
using MongoDB.Bson.Serialization.Attributes;

public class Allergy : MongoEntity
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("severity")]
    public AllergySeverity Severity { get; set; }
}