﻿using CookingApp.Infrastructure.Common;
using CookingApp.Models.ValueObjects;
using MongoDB.Bson.Serialization.Attributes;

namespace CookingApp.Models.Entities
{
    public class Recipe : MongoEntity
    {
        [BsonElement("user-id")]
        public string UserId { get; set; } = default!;

        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("isArchived")]
        public bool IsArchived { get; set; }

        [BsonElement("description")]
        public string Description { get; set; } = default!;

        [BsonElement("ingredients")]
        public IEnumerable<Ingredient> Ingredients { get; set; } = default!;

        [BsonElement("preparationSteps")]
        public IEnumerable<string> PreparationSteps { get; set; } = default!;

        [BsonElement("duration")]
        public string Duration { get; set; } = default!;

        [BsonElement("image-url")]
        public string ImageUrl { get; set; } = default!;

        [BsonElement("numberOfPortions")]
        public int NumberOfPortions { get; set; }
    }
}
