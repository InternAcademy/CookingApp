using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Services.File
{
    public interface IFileService
    {
        Task<IActionResult> GetFileAsync(string fileName);
        Task<string> SaveFileAsync(IFormFile fileData);
        Task DeleteFileAsync(string fileName);
    }
}
