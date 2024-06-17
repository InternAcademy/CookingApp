namespace CookingApp.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson;
    using System;
    using CookingApp.Infrastructure.Common;

    public class User : MongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("dietaryPreference")]
        public DietaryPreference DietaryPreference { get; set; }

        [BsonElement("allergies")]
        public List<Allergy> Allergies { get; set; } = new List<Allergy>();

        [BsonElement("avoidedFoods")]
        public List<Food> AvoidedFoods { get; set; } = new List<Food>();

        [BsonElement("chats")]
        public List<Chat> Chats { get; set; } = new List<Chat>();
    }
}