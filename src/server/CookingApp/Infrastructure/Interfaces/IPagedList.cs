namespace CookingApp.Infrastructure.Interfaces
{
    /// <summary>
    /// Provides an interface for a paged list of any type.
    /// </summary>
    /// <typeparam name="T">The type of items in the paged list.</typeparam>
    public interface IPagedList<T>
    {
        /// <summary>
        /// Gets the index of the current page.
        /// </summary>
        int PageIndex { get; }

        /// <summary>
        /// Gets the size of the page.
        /// </summary>
        int PageSize { get; }

        /// <summary>
        /// Gets the total number of items in the list.
        /// </summary>
        long TotalCount { get; }

        /// <summary>
        /// Gets the total number of pages.
        /// </summary>
        long TotalPages { get; }

        /// <summary>
        /// Gets a value indicating whether there is a previous page.
        /// </summary>
        bool HasPreviousPage { get; }

        /// <summary>
        /// Gets a value indicating whether there is a next page.
        /// </summary>
        bool HasNextPage { get; }

        /// <summary>
        /// Gets the items on the current page.
        /// </summary>
        ICollection<T> Items { get; }
    }
}
