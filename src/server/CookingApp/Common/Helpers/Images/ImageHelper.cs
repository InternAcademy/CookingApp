using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;

namespace CookingApp.Common.Helpers.Images
{
    public static class ImageHelper
    {
        public static string GetMimeType(byte[] fileBytes)
        {
            var mimeType = "application/octet-stream"; // Default to binary stream
            var fileSignature = BitConverter.ToString(fileBytes.Take(4).ToArray()).Replace("-", string.Empty).ToLowerInvariant();

            // MIME type checks for JPG, PNG, and WEBP
            if (fileSignature.StartsWith("ffd8"))
            {
                mimeType = "image/jpeg"; // JPG
            }
            else if (fileSignature.StartsWith("89504e47"))
            {
                mimeType = "image/png"; // PNG
            }
            else if (fileSignature.StartsWith("52494646"))
            {
                mimeType = "image/webp"; // WEBP
            }

            return mimeType;
        }
        public static IFormFile CompressImage(IFormFile formFile)
        {
            var memoryStream = new MemoryStream();

            using (var image = Image.Load(formFile.OpenReadStream()))
            {

                var encoderOptions = new JpegEncoder
                {
                    Quality = 10
                };


                image.Save(memoryStream, encoderOptions);
            }

            memoryStream.Position = 0;

            return new FormFile(memoryStream, 0, memoryStream.Length, formFile.Name, formFile.FileName)
            {
                Headers = formFile.Headers,
                ContentType = formFile.ContentType
            };
        }
    }
}
