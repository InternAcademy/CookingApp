using FluentAssertions;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CookingApp.UnitTests.Mocks;

namespace CookingApp.UnitTests.InfrastructureTests
{
    public class MongoEntityTests
    {
        [Fact]
        public void IsDeleted_ShouldBeFalse_WhenDeletedDateTimeIsNull()
        {
            // Arrange
            var entity = new MongoEntityMock();

            // Act
            bool isDeleted = entity.IsDeleted;

            // Assert
            isDeleted.Should().BeFalse("because DeletedDateTime is null");
        }

        [Fact]
        public void IsDeleted_ShouldBeTrue_WhenDeletedDateTimeIsNotNull()
        {
            // Arrange
            var entity = new MongoEntityMock
            {
                DeletedDateTime = DateTime.Now
            };

            // Act
            bool isDeleted = entity.IsDeleted;

            // Assert
            isDeleted.Should().BeTrue("because DeletedDateTime is not null");
        }

        [Fact]
        public void Id_ShouldBeAutomaticallyGeneratedAndValidObjectId()
        {
            // Arrange & Act
            var entity = new MongoEntityMock();

            // Assert
            entity.Id.Should().NotBeEmpty();
            ObjectId.TryParse(entity.Id, out _).Should().BeTrue("because Id should be a valid MongoDB ObjectId");
        }

        [Fact]
        public void CreatedDateTime_WhenSet_ShouldReflectCorrectly()
        {
            // Arrange
            var dateTime = DateTime.UtcNow;
            var entity = new MongoEntityMock
            {
                CreatedDateTime = dateTime
            };

            // Act & Assert
            entity.CreatedDateTime.Should().Be(dateTime);
        }

        [Fact]
        public void UpdatedDateTime_WhenSet_ShouldReflectCorrectly()
        {
            // Arrange
            var dateTime = DateTime.UtcNow;
            var entity = new MongoEntityMock
            {
                UpdatedDateTime = dateTime
            };

            // Act & Assert
            entity.UpdatedDateTime.Should().Be(dateTime);
        }

        [Fact]
        public void RowVersion_ShouldBeOne_WhenNewEntityIsCreated()
        {
            // Arrange & Act
            var entity = new MongoEntityMock();

            // Assert
            entity.RowVersion.Should().Be(1, "because it should initialize with version 1");
        }

        [Fact]
        public void RowVersion_WhenSet_ShouldReflectCorrectly()
        {
            // Arrange
            var entity = new MongoEntityMock
            {
                RowVersion = 5
            };

            // Act & Assert
            entity.RowVersion.Should().Be(5);
        }
    }
}
