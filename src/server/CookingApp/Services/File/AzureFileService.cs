namespace CookingApp.Services.File
{
    using Azure.Storage.Blobs;

    public class AzureFileService(string connectionString, string containerName) : IFileService
    {
        public async Task<string> UploadFileAndGetUrl(IFormFile fileData, string? nameAddition = null)
        {
            string uniqueFileName = $"{(nameAddition is not null ? nameAddition : "")}{Guid.NewGuid()}";
            var container = new BlobContainerClient(connectionString, containerName);
            var blob = container.GetBlobClient(uniqueFileName);

            using (var ms = new MemoryStream())
            {
                await fileData.CopyToAsync(ms);
                ms.Position = 0;
                await blob.UploadAsync(ms);
            }

            return blob.Uri.ToString();
        }
    }
}
