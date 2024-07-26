using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Services.File
{
    public interface IFileService
    {
        Task<string> UploadFileAndGetUrl(IFormFile fileData);
    }
}
