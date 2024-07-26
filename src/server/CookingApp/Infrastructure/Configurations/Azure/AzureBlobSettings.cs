namespace CookingApp.Infrastructure.Configurations.Azure
{
    public class AzureBlobSettings
    {
        public string? ConnectionString { get; private set; }
        public string? ContainerName { get; private set; }
    }
}
