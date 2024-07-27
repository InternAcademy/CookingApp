namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class Role : ValueObject
    {
        [BsonElement("type")]
        public RoleType Type { get; set; } = default!;

        [BsonElement("limitations")]
        public Limitations Limitations { get; set; } = default!;
    }
}