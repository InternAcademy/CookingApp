using CookingApp.Infrastructure.Interfaces;

namespace CookingApp.UnitTests.Mocks
{
    public class MongoEntityMock : IMongoEntity
    {
        public string Id { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public int RowVersion { get; set; }
        public bool IsDeleted => DeletedDateTime.HasValue;
        public DateTime? DeletedDateTime { get; set; }
    }
}
