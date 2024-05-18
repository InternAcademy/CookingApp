using CookingApp.Infrastructure.Configurations.Database;
using FluentAssertions;

namespace CookingApp.UnitTests.InfrastructureTests.Configurations
{
    public class MongoConfigurationTests
    {
        [Fact]
        public void WithConnectionString_ShouldSetConnectionString()
        {
            // Arrange
            var config = new MongoConfiguration();
            var testConnectionString = "mongodb://localhost:27017";

            // Act
            var result = config.WithConnectionString(testConnectionString);

            // Assert
            result.ConnectionString.Should().Be(testConnectionString);
            result.Should().BeSameAs(config);
        }

        [Fact]
        public void WithDatabaseName_ShouldSetDatabaseName()
        {
            // Arrange
            var config = new MongoConfiguration();
            var databaseName = "TestDatabase";

            // Act
            var result = config.WithDatabaseName(databaseName);

            // Assert
            result.Database.Should().Be(databaseName);
            result.Should().BeSameAs(config);
        }

        [Fact]
        public void WithSoftDeletes_ShouldConfigureSoftDeletes()
        {
            // Arrange
            var config = new MongoConfiguration();
            Action<SoftDeleteConfiguration> action = sd => sd.Enabled();

            // Act
            var result = config.WithSoftDeletes(action);

            // Assert
            result.SoftDeleteConfiguration.IsEnabled.Should().BeTrue();
            result.Should().BeSameAs(config);
        }

        [Fact]
        public void RepresentEnumValuesAs_ShouldSetEnumConvention()
        {
            // Arrange
            var config = new MongoConfiguration();

            // Act
            var result = config.RepresentEnumValuesAs(MongoDB.Bson.BsonType.String);

            // Assert
            result.EnumConvention.Should().Be(MongoDB.Bson.BsonType.String);
        }

        [Fact]
        public void WithIgnoreIfDefaultConvention_ShouldSetIgnoreIfDefault()
        {
            // Arrange
            var config = new MongoConfiguration();

            // Act
            var result = config.WithIgnoreIfDefaultConvention(false);

            // Assert
            result.IgnoreIfDefaultConvention.Should().BeFalse();
        }

        [Fact]
        public void WithIgnoreIfNullConvention_ShouldSetIgnoreIfNull()
        {
            // Arrange
            var config = new MongoConfiguration();

            // Act
            var result = config.WithIgnoreIfNullConvention(false);

            // Assert
            result.IgnoreIfNullConvention.Should().BeFalse();
        }
    }
}
