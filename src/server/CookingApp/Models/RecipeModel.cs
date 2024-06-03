namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class RecipeModel : MongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

        [BsonElement("content")]
        public string Content { get; set; }

        [BsonElement("created")]
        public DateTime Created { get; set; }

    }
}
