using CookingApp.Infrastructure;
using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.Infrastructure.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CookingApp.UnitTests.Mocks
{
    internal class TestableRepository<T> : Repository<T> where T : class, IMongoEntity
    {
        public TestableRepository(IMongoClient client, IOptions<MongoConfiguration> configuration, ILoggerFactory loggerFactory)
            : base(client, configuration, loggerFactory)
        {
        }

        public MongoConfiguration GetConfiguration() => Configuration;
        public IMongoClient GetClient() => Client;
        public IMongoDatabase GetDatabase() => Database;
        public IMongoCollection<T> GetCollection() => Collection;
    }
}
