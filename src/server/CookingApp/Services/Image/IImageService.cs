namespace CookingApp.Services.Image
{
    public interface IImageService
    {
        Task<string> GenerateImage(string prompt);
    }
}
