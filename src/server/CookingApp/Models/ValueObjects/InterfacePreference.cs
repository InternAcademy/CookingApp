namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class InterfacePreference : ValueObject
    {
        [BsonElement("theme")]
        public Theme Theme { get; set; }
       
        [BsonElement("language")]
        public Language Language { get; set; }
    }
}