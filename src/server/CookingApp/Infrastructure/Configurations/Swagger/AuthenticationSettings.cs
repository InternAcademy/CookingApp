namespace CookingApp.Infrastructure.Configurations.Swagger
{
    public class AuthenticationSettings
    {
        public string Authority { get; set; }
        public Dictionary<string, string> Scopes { get; set; }
    }
}
