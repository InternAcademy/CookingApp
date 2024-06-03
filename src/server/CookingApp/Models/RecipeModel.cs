namespace CookingApp.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class RecipeModel
    {
        class Recipe
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
}
