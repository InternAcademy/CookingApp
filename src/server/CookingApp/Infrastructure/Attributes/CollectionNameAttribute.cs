using System.Diagnostics.CodeAnalysis;

namespace CookingApp.Infrastructure.Attributes
{
    /// <summary>
    /// Sets the Collection Name for a Mongo Entity
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    [ExcludeFromCodeCoverage]
    public class CollectionNameAttribute : Attribute
    {
        public string Name { get; set; }

        public CollectionNameAttribute(string name)
        {
            this.Name = name;
        }
    }
}
