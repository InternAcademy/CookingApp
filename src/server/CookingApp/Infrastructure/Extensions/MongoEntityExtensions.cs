namespace CookingApp.Infrastructure.Extensions
{
    using CookingApp.Infrastructure.Attributes;
    using CookingApp.Infrastructure.Interfaces;

    public static class MongoEntityExtensions
    {
        /// <summary>
        /// Gets the Collection Name for an Entity
        /// </summary>
        /// <typeparam name="T">Mongo Entity</typeparam>
        /// <returns>Collection Name</returns>
        public static string GetCollectionName<T>() where T : class, IMongoEntity
        {
            var collectionNameAttribute = (CollectionNameAttribute)typeof(T).GetCustomAttributes(typeof(CollectionNameAttribute), true).FirstOrDefault();
            return collectionNameAttribute != null ? collectionNameAttribute.Name.ToLower() : typeof(T).Name.ToLower();
        }
    }
}
