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
            public string Content { get; set; }
            public DateTime Created { get; set; }

        }
    }
}
