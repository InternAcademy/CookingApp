﻿using System.Collections;
using CookingApp.Infrastructure.Interfaces;

namespace CookingApp.Infrastructure.Pagination
{
    public class Page<T> : IPage<T>
    {
        private readonly IEnumerable<T> _values;

        public Page(IEnumerable<T> values, int currentPage, int pageSize, int totalCount)
        {
            _values = values;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalCount = totalCount;
        }

        public int CurrentPage { get; }

        public int PageSize { get; }

        public int TotalCount { get; }

        public IEnumerator<T> GetEnumerator() => _values.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => _values.GetEnumerator();
    }
}
