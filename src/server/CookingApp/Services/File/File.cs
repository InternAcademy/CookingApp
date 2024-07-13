using System.Text.RegularExpressions;

namespace CookingApp.Services.File
{
    public static partial class File
    {
        public static IFormFile ConvertDataUriToFormFile(string dataUri)
        {
            var match = ContentType().Match(dataUri);
            if (!match.Success)
            {
                throw new ArgumentException("Invalid data URI");
            }

            string contentType = match.Groups["type"].Value;
            string base64Data = match.Groups["data"].Value;

            byte[] fileBytes = Convert.FromBase64String(base64Data);

            var memoryStream = new MemoryStream(fileBytes);
            var file = new FormFile(memoryStream, 0, fileBytes.Length, string.Empty, "file")
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };

            return file;
        }

        public static IFormFile ConvertBinaryDataToFormFile(BinaryData binaryData, string fileName, string contentType)
        {
            byte[] byteArray = binaryData.ToArray();

            var memoryStream = new MemoryStream(byteArray);
            var file = new FormFile(memoryStream, 0, memoryStream.Length, "file", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };

            return file;
        }


        [GeneratedRegex(@"data:(?<type>.*?);base64,(?<data>.*)")]
        private static partial Regex ContentType();
    }
}
