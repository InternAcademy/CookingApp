namespace CookingApp.Infrastructure.Interfaces
{
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>
    /// Interface representing a MongoDB entity with essential metadata properties.
    /// </summary>
    public interface IMongoEntity
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity.
        /// </summary>
        string Id { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the entity was created.
        /// </summary>
        DateTime CreatedDateTime { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the entity was last updated.
        /// </summary>
        DateTime UpdatedDateTime { get; set; }

        /// <summary>
        /// Gets or sets the row version for concurrency control.
        /// </summary>
        int RowVersion { get; set; }

        /// <summary>
        /// Gets a value indicating whether the entity is marked as deleted.
        /// </summary>
        bool IsDeleted { get; }

        /// <summary>
        /// Gets or sets the date and time when the entity was deleted, if applicable.
        /// </summary>
        DateTime? DeletedDateTime { get; set; }
    }
}
