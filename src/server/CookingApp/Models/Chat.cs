using CookingApp.Infrastructure.Common;
using MongoDB.Bson.Serialization.Attributes;

public class Chat : MongoEntity
{
    [BsonElement("createdTime")]
    public DateTime CreatedTime { get; set; }

    [BsonElement("requests")]
    public List<Request> Requests { get; set; } = new List<Request>();

    [BsonElement("responses")]
    public List<Response> Responses { get; set; } = new List<Response>();
}