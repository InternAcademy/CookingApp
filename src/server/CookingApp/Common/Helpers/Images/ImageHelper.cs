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
    }
}
