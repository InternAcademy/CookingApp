
using CookingApp.Infrastructure.Exceptions;

namespace CookingApp.Infrastructure.Middleware
{
    using CookingApp.ViewModels.Api;
    using Stripe;
    using System.Net;
    using System.Text.Json;

    public class ExceptionMiddleware(RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {   
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception switch
            {
                ArgumentException => (int)HttpStatusCode.BadRequest,
                StripeException => (int)HttpStatusCode.BadRequest,
                InvalidRecipeRequestException => (int)HttpStatusCode.BadRequest,
                _ => (int)HttpStatusCode.InternalServerError
            };

            var response = new ApiResponse<object>
            {
                Status = context.Response.StatusCode,
                Errors = [exception.Message]
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var jsonResponse = JsonSerializer.Serialize(response, options);

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
