using CookingApp.Infrastructure.Extensions;
using CookingApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using CookingApp.ViewModels.Api;
using CookingApp.ViewModels.Chat;

namespace CookingApp.Infrastructure.Filters
{
    public class PaginationHeadersFilter : IAsyncResultFilter
    {
        public async Task OnResultExecutionAsync(
            ResultExecutingContext context, ResultExecutionDelegate next)
        {
            if (context.Result is ObjectResult objectResult)
            {
                if (TryGetIPageData(objectResult.Value, out var page))
                {
                    context.HttpContext.Response.Headers.AddPaginationHeader(
                        page.CurrentPage,
                        page.PageSize,
                        page.TotalCount);
                }
            }
            await next();
        }
        private bool TryGetIPageData(object value, out IPage page)
        {
            page = null;

            if (value == null)
            {
                return false;
            }

            var valueType = value.GetType();
            if (valueType.IsGenericType && valueType.GetGenericTypeDefinition() == typeof(ApiResponse<>))
            {
                var dataProperty = valueType.GetProperty("Data");
                if (dataProperty != null)
                {
                    var dataValue = dataProperty.GetValue(value);
                    if (dataValue is IPage iPage)
                    {
                        page = iPage;
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
