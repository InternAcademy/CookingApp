namespace CookingApp.Infrastructure.Configurations.Swagger
{
    public class SwaggerConfiguration
    {
        internal SwaggerSettings Settings { get; set; } = null!;

        /// <summary>
        /// Loads settings from a <see cref="SwaggerSettings"/> instance
        /// </summary>
        /// <param name="swaggerSettings">Swagger Settings</param>
        public void LoadSettingsFrom(SwaggerSettings swaggerSettings) => this.Settings = swaggerSettings;
    }
}
