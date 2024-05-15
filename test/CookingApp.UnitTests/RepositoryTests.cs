using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.Infrastructure;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.UnitTests.Mocks;
using System.Xml;

namespace CookingApp.UnitTests
{
    public class RepositoryTests
    {
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
            var loggerFactoryMock = new Mock<ILoggerFactory>();
            var config = new MongoConfiguration().WithDatabaseName(null);
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(config);

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

            var databaseName = config.Database.ToLower();
            clientMock.Setup(c => c.GetDatabase(databaseName, null)).Returns(databaseMock.Object);
            databaseMock.Setup(db => db.GetCollection<MongoEntityMock>(typeof(MongoEntityMock).Name.ToLower(), null))
                .Returns(collectionMock.Object);

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
            var loggerFactoryMock = new Mock<ILoggerFactory>();
            var config = new MongoConfiguration().WithDatabaseName(dbName);
            var configOptionsMock = new Mock<IOptions<MongoConfiguration>>();
            configOptionsMock.Setup(o => o.Value).Returns(config);

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
            var loggerFactoryMock = new Mock<ILoggerFactory>();
            var loggerMock = new Mock<ILogger>();
            clientMock.Setup(c => c.GetDatabase("testdb", null)).Returns(databaseMock.Object);

            loggerFactoryMock.Setup(f => f.CreateLogger(It.IsAny<string>())).Returns(loggerMock.Object);

            // Act
            var repository = new TestableRepository<MongoEntityMock>(clientMock.Object, configOptionsMock.Object, loggerFactoryMock.Object);

            // Assert
            loggerFactoryMock.Verify(f => f.CreateLogger(It.IsAny<string>()), Times.Once);
        }
    }
}