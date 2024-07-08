namespace CookingApp.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson;
    using System;
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using CookingApp.Models.ValueObjects;

    public class UserProfile : MongoEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("user-id")]
        public string UserId { get; set; } = default!;

        [BsonElement("stripe-id")]
        public string StripeId { get; set; } = default!;

        [BsonElement("dietary-preference")]
        public DietaryPreference DietaryPreference { get; set; }

        [BsonElement("allergies")]
        public List<Allergy> Allergies { get; set; } = default!;

        [BsonElement("avoided-foods")]
        public List<Food> AvoidedFoods { get; set; } = default!;

        [BsonElement("chats")]
        public List<Chat> Chats { get; set; } = default!;
    }
}