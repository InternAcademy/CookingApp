namespace CookingApp.Models
{
    using CookingApp.Infrastructure.Common;
    using MongoDB.Bson.Serialization.Attributes;
    using CookingApp.Infrastructure.Mapping;
    using CookingApp.ViewModels.Chat;


    public class Chat : MongoEntity, IMapFrom<SaveChatRequest>
    {
        [BsonElement("external-id")]
        public string ExternalId { get; set; } = default!;

        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("user-id")]
        public string UserId { get; set; } = default!;

        [BsonElement("requests")]
        public List<Message> Requests { get; set; } = default!;

        [BsonElement("responses")]
        public List<Message> Responses { get; set; } = default!;

        [BsonElement("is-archived")] 
        public bool IsArchived { get; set; }
    }
}