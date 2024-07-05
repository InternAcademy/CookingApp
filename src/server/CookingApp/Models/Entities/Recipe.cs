using CookingApp.Infrastructure.Common;
using CookingApp.Models.ValueObjects;
using MongoDB.Bson.Serialization.Attributes;

namespace CookingApp.Models.Entities
{
    public class Recipe : MongoEntity
    {
        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("description")]
        public string Description { get; set; } = default!;

        [BsonElement("ingredients")]
        public IEnumerable<Ingredient> Ingredients { get; set; }

        [BsonElement("preparationSteps")]
        public IEnumerable<string> PreparationSteps { get; set; }

        [BsonElement("duration")]
        public string Duration { get; set; }

        [BsonElement("numberOfPortions")]
        public int NumberOfPortions { get; set; }
    }
}
