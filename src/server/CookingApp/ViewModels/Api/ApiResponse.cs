using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CookingApp.ViewModels.Api
{
    public class ApiResponse<T> : IActionResult
    {
        public int Status{ get; set; }

        public T Data { get; set; }

        public List<string> Errors { get; set; }

        public ApiResponse()
        {
           Errors = new List<string>();
        }
        public ApiResponse(int status, T data, List<string> errors)
        {
            Status = status;
            Data = data;
            Errors = errors ?? new List<string>();
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(this)
            {
                StatusCode = this.Status
            };
            await objectResult.ExecuteResultAsync(context);
        }
    }
}
