namespace CookingApp.Infrastructure.Configurations.OpenAI
{
    public class OpenAIOptions
    {
        public string APIKey { get; set; } = default!;

        public string APIUrl { get; set; } = default!;

        public string Model { get; set; } = default!;
    }
}
