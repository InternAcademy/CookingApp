namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;

    public class Food : MongoEntity
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("type")]
        public FoodType Type { get; set; }
    }
}