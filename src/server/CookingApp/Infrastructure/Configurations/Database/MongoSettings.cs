namespace CookingApp.Infrastructure.Configurations.Database
{
    public record MongoSettings
    {
        public string Database { get; init; } = null!;
        public string Url { get; init; } = null!;

        public bool SoftDeleteEnabled { get; init; } = true;
        public int SoftDeletePollInMinutes { get; init; } = 60;
        public int SoftDeleteRetentionInDays { get; init; } = 28;
    }
}
