using AutoMapper;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Infrastructure.Pagination;

namespace CookingApp.Infrastructure.Extensions
{
    public static class PagedListExtensions
    {
        public static IPage<T> ToPage<T>(this IPagedList<T> pagedList) => new Page<T>(
            pagedList.Items,
            pagedList.PageIndex,
            pagedList.PageSize,
            (int)pagedList.TotalCount);

        public static IPagedList<TDestination> MapPagedList<TSource, TDestination>(this IPagedList<TSource> source, IMapper mapper)
        {
            var mappedItems = mapper.Map<ICollection<TDestination>>(source.Items);
            return new PagedList<TDestination>(mappedItems, source.PageIndex, source.PageSize, source.TotalPages, source.TotalCount);
        }
    }
}
