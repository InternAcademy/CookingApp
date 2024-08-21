namespace CookingApp.Services.Image
{
    using CookingApp.Services.File;
    using global::OpenAI.Images;
    using File = CookingApp.Services.File.File;

    public class ImageService(ImageClient client, IFileService fileService) : IImageService
    {
        public async Task<string> GenerateImage(string prompt)
        {
            var options = new ImageGenerationOptions()
            {
                Size = GeneratedImageSize.W1792xH1024,
                ResponseFormat = GeneratedImageFormat.Bytes
            };

            var image = await client.GenerateImageAsync(prompt, options);
            var file = File.ConvertBinaryDataToFormFile(image.Value.ImageBytes, Guid.NewGuid().ToString(), "image/png");
            var imagePath = await fileService.UploadFileAndGetUrl(file, "Generated - ");

            return imagePath;
        }
    }
}
