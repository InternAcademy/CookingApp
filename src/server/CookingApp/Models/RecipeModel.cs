namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class RecipeModel : MongoEntity
    {
        [BsonElement("content")]
        public string Content { get; set; } = default!;
    }
}
