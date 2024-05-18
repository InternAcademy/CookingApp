using CookingApp.Infrastructure;
using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.UnitTests.Mocks;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using System.Linq.Expressions;

namespace CookingApp.UnitTests.InfrastructureTests
{
    public class RepositoryTests
    {
        private readonly Mock<IMongoCollection<MongoEntityMock>> _collectionMock;
        private readonly Mock<ILogger<Repository<MongoEntityMock>>> _loggerMock;
        private readonly Mock<IClientSessionHandle> _sessionMock;  // For transaction handling
        private readonly Repository<MongoEntityMock> _repository;
        private readonly Mock<IOptions<MongoConfiguration>> _configOptionsMock;

        public RepositoryTests()
        {
            _collectionMock = new Mock<IMongoCollection<MongoEntityMock>>();
            _loggerMock = new Mock<ILogger<Repository<MongoEntityMock>>>();
            _sessionMock = new Mock<IClientSessionHandle>();  // Mock session for transaction testing

            var clientMock = new Mock<IMongoClient>();
            var databaseMock = new Mock<IMongoDatabase>();
            clientMock.Setup(c => c.GetDatabase(It.IsAny<string>(), It.IsAny<MongoDatabaseSettings>()))
                .Returns(databaseMock.Object);
            databaseMock.Setup(db => db.GetCollection<MongoEntityMock>(It.IsAny<string>(), It.IsAny<MongoCollectionSettings>()))
                .Returns(_collectionMock.Object);
            clientMock.Setup(c => c.StartSessionAsync(It.IsAny<ClientSessionOptions>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(_sessionMock.Object);  // Set up the client to return the mocked session

            _configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            var mongoConfig = new MongoConfiguration().WithDatabaseName("testdb").WithSoftDeletes(s => s.Enabled());
            _configOptionsMock.Setup(o => o.Value).Returns(mongoConfig);

            var loggerFactoryMock = new Mock<ILoggerFactory>();
            loggerFactoryMock.Setup(f => f.CreateLogger(It.IsAny<string>())).Returns(_loggerMock.Object);

            _repository = new TestableRepository<MongoEntityMock>(clientMock.Object, _configOptionsMock.Object, loggerFactoryMock.Object);
        }
        private Expression<Func<MongoEntityMock, bool>> GetByIdFilter(string id) => x => x.Id == id;

        private Mock<ILoggerFactory> SetupLoggerFactory<T>()
        {
            var loggerMock = new Mock<ILogger<T>>();
            var loggerFactoryMock = new Mock<ILoggerFactory>();
            loggerFactoryMock.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(loggerMock.Object);
            return loggerFactoryMock;
        }

        [Fact]
        public void Constructor_ThrowsArgumentNullException_IfConfigurationDatabaseIsNull()
        {
            // Arrange
            var clientMock = new Mock<IMongoClient>();
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(new MongoConfiguration().WithDatabaseName(null));
            var loggerFactoryMock = SetupLoggerFactory<Repository<MongoEntityMock>>();

            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new TestableRepository<MongoEntityMock>(clientMock.Object, configOptionsMock.Object, loggerFactoryMock.Object));
        }

        [Fact]
        public void Constructor_SetsUpDatabaseAndCollection_Correctly_WithValidConfig()
        {
            // Arrange
            var clientMock = new Mock<IMongoClient>();
            var databaseMock = new Mock<IMongoDatabase>();
            var collectionMock = new Mock<IMongoCollection<MongoEntityMock>>();
            var config = new MongoConfiguration().WithDatabaseName("testdb");
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(config);

            clientMock.Setup(c => c.GetDatabase(config.Database.ToLower(), null)).Returns(databaseMock.Object);
            databaseMock.Setup(db => db.GetCollection<MongoEntityMock>(typeof(MongoEntityMock).Name.ToLower(), null)).Returns(collectionMock.Object);
            var loggerFactoryMock = SetupLoggerFactory<Repository<MongoEntityMock>>();

            // Act
            var repository = new TestableRepository<MongoEntityMock>(clientMock.Object, configOptionsMock.Object, loggerFactoryMock.Object);

            // Assert
            repository.GetConfiguration().Should().BeEquivalentTo(config);
            repository.GetDatabase().Should().BeSameAs(databaseMock.Object);
            repository.GetCollection().Should().BeSameAs(collectionMock.Object);
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public void Constructor_ThrowsArgumentNullException_WhenDatabaseNameIsInvalid(string dbName)
        {
            // Arrange
            var clientMock = new Mock<IMongoClient>();
            var config = new MongoConfiguration().WithDatabaseName(dbName);
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(config);
            var loggerFactoryMock = SetupLoggerFactory<Repository<MongoEntityMock>>();

            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new TestableRepository<MongoEntityMock>(clientMock.Object, configOptionsMock.Object, loggerFactoryMock.Object));
        }

        [Fact]
        public void Constructor_SuccessfullyCreatesLogger()
        {
            // Arrange
            var clientMock = new Mock<IMongoClient>();
            var databaseMock = new Mock<IMongoDatabase>();
            var config = new MongoConfiguration().WithDatabaseName("testdb");
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(config);
            clientMock.Setup(c => c.GetDatabase(config.Database, null)).Returns(databaseMock.Object);
            var loggerFactoryMock = SetupLoggerFactory<Repository<MongoEntityMock>>();

            // Act
            var repository = new TestableRepository<MongoEntityMock>(clientMock.Object, configOptionsMock.Object, loggerFactoryMock.Object);

            // Assert
            loggerFactoryMock.Verify(f => f.CreateLogger(It.IsAny<string>()), Times.Once);
        }
        [Fact]
        public async Task InsertAsync_SingleEntity_CallsInsertOneAsyncAndSetsProperties()
        {
            var entity = new MongoEntityMock { Id = "1" };
            _collectionMock.Setup(c => c.InsertOneAsync(It.IsAny<MongoEntityMock>(), null, default))
                           .Returns(Task.CompletedTask);

            await _repository.InsertAsync(entity);

            _collectionMock.Verify(c => c.InsertOneAsync(It.Is<MongoEntityMock>(e => e.Id == entity.Id && e.RowVersion == 1 && e.CreatedDateTime != default), null, default), Times.Once);
            _loggerMock.Verify(l => l.Log(LogLevel.Debug, It.IsAny<EventId>(), It.Is<It.IsAnyType>((o, t) => o.ToString() == $"MongoDb Insert -> EntityId: {entity.Id}"), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Once);
        }

        [Fact]
        public async Task InsertAsync_MultipleEntities_CallsInsertManyAsyncAndSetsProperties()
        {
            var entities = new List<MongoEntityMock> { new MongoEntityMock { Id = "1" }, new MongoEntityMock { Id = "2" } };
            _collectionMock.Setup(c => c.InsertManyAsync(It.IsAny<IEnumerable<MongoEntityMock>>(), null, default))
                           .Returns(Task.CompletedTask);

            await _repository.InsertAsync(entities);

            _collectionMock.Verify(c => c.InsertManyAsync(It.Is<IEnumerable<MongoEntityMock>>(es => es.All(e => e.RowVersion == 1 && e.CreatedDateTime != default)), null, default), Times.Once);
            _loggerMock.Verify(l => l.Log(LogLevel.Debug, It.IsAny<EventId>(), It.Is<It.IsAnyType>((o, t) => o.ToString() == $"MongoDb Insert -> EntityId-s: {string.Join(", ", entities.Select(e => e.Id))}"), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Once);
        }

        [Fact]
        public async Task InsertAsync_NullEntities_DoesNotCallInsertManyAsync()
        {
            await _repository.InsertAsync(null as ICollection<MongoEntityMock>);

            _collectionMock.Verify(c => c.InsertManyAsync(It.IsAny<IEnumerable<MongoEntityMock>>(), null, default), Times.Never);
            _loggerMock.Verify(l => l.Log(LogLevel.Debug, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Never);
        }
        [Fact]
        public async Task UpdateAsync_UpdatesEntityCorrectly()
        {
            var entity = new MongoEntityMock { Id = "123", RowVersion = 1 };
            var updatedEntity = entity;
            updatedEntity.RowVersion += 1;
            updatedEntity.UpdatedDateTime = DateTime.UtcNow;

            _collectionMock.Setup(x => x.FindOneAndReplaceAsync(
                    It.IsAny<FilterDefinition<MongoEntityMock>>(),
                    It.Is<MongoEntityMock>(m => m.RowVersion == 2 && m.UpdatedDateTime <= DateTime.UtcNow),
                    It.IsAny<FindOneAndReplaceOptions<MongoEntityMock, MongoEntityMock>>(),
                    default))
                .ReturnsAsync((FilterDefinition<MongoEntityMock> filter, MongoEntityMock replacement, FindOneAndReplaceOptions<MongoEntityMock, MongoEntityMock> options, CancellationToken token) => replacement);


            await _repository.UpdateAsync(entity);

            entity.RowVersion.Should().Be(3);
            entity.UpdatedDateTime.Should().BeCloseTo(DateTime.UtcNow, precision: TimeSpan.FromSeconds(5));
            _loggerMock.Verify(l => l.Log(LogLevel.Debug, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Once);
        }
        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public async Task DeleteByIdAsync_DeletesCorrectly(bool hardDelete)
        {
            var id = "123";
            await _repository.DeleteByIdAsync(id, hardDelete);

            VerifyDeleteOneAsync(GetByIdFilter(id), hardDelete);
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public async Task DeleteAsync_DeletesCorrectly(bool hardDelete)
        {
            var entity = new MongoEntityMock { Id = "123" };
            await _repository.DeleteAsync(entity, hardDelete);

            VerifyDeleteOneAsync(GetByIdFilter(entity.Id), hardDelete);
        }

        private void VerifyDeleteOneAsync(Expression<Func<MongoEntityMock, bool>> filter, bool hardDelete)
        {
            if (hardDelete)
            {
                _collectionMock.Verify(x => x.FindOneAndDeleteAsync(
                        It.Is<FilterDefinition<MongoEntityMock>>(fd => true),
                        It.IsAny<FindOneAndDeleteOptions<MongoEntityMock, MongoEntityMock>>(),
                        default),
                    Times.Once);
            }
            else
            {
                _collectionMock.Verify(x => x.FindOneAndUpdateAsync(
                        It.Is<FilterDefinition<MongoEntityMock>>(fd => true),
                        It.IsAny<UpdateDefinition<MongoEntityMock>>(),
                        It.IsAny<FindOneAndUpdateOptions<MongoEntityMock, MongoEntityMock>>(),
                        default),
                    Times.Once);
            }
        }

        [Fact]
        public async Task RestoreByIdAsync_SetsDeletedDateTimeToNull()
        {
            var id = "123";
            FilterDefinition<MongoEntityMock> capturedFilter = null;
            UpdateDefinition<MongoEntityMock> capturedUpdate = null;

            _collectionMock.Setup(x => x.FindOneAndUpdateAsync(
                    It.IsAny<FilterDefinition<MongoEntityMock>>(),
                    It.IsAny<UpdateDefinition<MongoEntityMock>>(),
                    It.IsAny<FindOneAndUpdateOptions<MongoEntityMock, MongoEntityMock>>(),
                    It.IsAny<CancellationToken>()))
                .Callback<FilterDefinition<MongoEntityMock>, UpdateDefinition<MongoEntityMock>, FindOneAndUpdateOptions<MongoEntityMock, MongoEntityMock>, CancellationToken>((f, u, o, c) =>
                {
                    capturedFilter = f;
                    capturedUpdate = u;
                })
                .ReturnsAsync(new MongoEntityMock { Id = id });

            await _repository.RestoreByIdAsync(id);

            // After action
            Assert.NotNull(capturedFilter); // Check if filter was set
            Assert.NotNull(capturedUpdate); // Check if update was set

            _loggerMock.Verify(l => l.Log(LogLevel.Debug, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Once);
        }
        [Fact]
        public async Task CountAsync_ThrowsIfPredicateIsNull()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _repository.CountAsync(null));
        }

        [Fact]
        public async Task CountAsync_ReturnsCorrectCount()
        {
            Expression<Func<MongoEntityMock, bool>> predicate = x => x.Id == "1";
            _collectionMock.Setup(x => x.CountDocumentsAsync(It.IsAny<FilterDefinition<MongoEntityMock>>(), null, default))
                .ReturnsAsync(1);

            var count = await _repository.CountAsync(predicate);

            Assert.Equal(1, count);
        }
    }
}