using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;

namespace CookingApp.Services.File
{
    public class ImgurFileService(HttpClient _httpClient, string clientId) : IFileService
    {
        public async Task<string> UploadFileAndGetUrl(IFormFile fileData)
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Client-ID", clientId);

            using var formContent = new MultipartFormDataContent();
            using var imageStream = fileData.OpenReadStream();
            using var streamContent = new StreamContent(imageStream);
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(fileData.ContentType);

            formContent.Add(streamContent, "image", fileData.FileName);

            var response = await _httpClient.PostAsync("https://api.imgur.com/3/upload", formContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Image upload failed with status code: {response.StatusCode}");
            }

            var jsonResponse = JObject.Parse(responseContent);
            return jsonResponse["data"]!["link"]!.ToString();
        }
    }
}
