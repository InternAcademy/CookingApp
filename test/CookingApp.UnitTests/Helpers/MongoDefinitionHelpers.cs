using MongoDB.Bson.Serialization;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookingApp.UnitTests.Helpers
{
    public static class MongoDefinitionHelpers
    {
        public static bool FilterExpressionContains<T>(this FilterDefinition<T> filterDefinition, string expectedSubstring)
        {
            var documentSerializer = BsonSerializer.SerializerRegistry.GetSerializer<T>();
            var renderedFilter = filterDefinition.Render(documentSerializer, BsonSerializer.SerializerRegistry);
            return renderedFilter.ToString().Contains(expectedSubstring);
        }

        public static bool UpdateExpressionContains<T>(this UpdateDefinition<T> updateDefinition, string fieldName, object expectedValue)
        {
            var documentSerializer = BsonSerializer.SerializerRegistry.GetSerializer<T>();
            var renderedUpdate = updateDefinition.Render(documentSerializer, BsonSerializer.SerializerRegistry);
            var expectedValueBson = BsonValue.Create(expectedValue);

            // Checking if the fieldName within the update matches expectedValue
            if (renderedUpdate is BsonDocument updateDocument)
            {
                return updateDocument.Contains(fieldName) && updateDocument[fieldName].Equals(expectedValueBson);
            }

            return false;
        }
    }
}
