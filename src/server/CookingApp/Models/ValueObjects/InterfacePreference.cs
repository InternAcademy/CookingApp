namespace CookingApp.Models.ValueObjects
{
    using CookingApp.Infrastructure.Common;
    using CookingApp.Models.Enums;
    using MongoDB.Bson.Serialization.Attributes;

    public class InterfacePreference : ValueObject
    {
        [BsonElement("theme")]
        public Theme Theme { get; set; }

        [BsonElement("language")]
        public string Language { get; set; } = default!;

        public InterfacePreference CreateInterface()
        {
            return new InterfacePreference()
            {
                Language = "English",
                Theme = Theme.Light
            };
        }
    }
}