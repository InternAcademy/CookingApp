namespace CookingApp.Infrastructure.Configurations.Swagger
{
    public class SwaggerConfiguration
    {
        internal SwaggerSettings Settings { get; set; } = null!;
        internal AuthenticationSettings? Security { get; set; }

        /// <summary>
        /// Loads settings from a <see cref="SwaggerSettings"/> instance
        /// </summary>
        /// <param name="swaggerSettings">Swagger Settings</param>
        public void LoadSettingsFrom(SwaggerSettings swaggerSettings) => this.Settings = swaggerSettings;

        // <summary>
        /// Loads security settings from a SecuritySettings instance
        /// </summary>
        /// <param name="securitySettings">Security Settings</param>
        public void LoadSecuritySettingsFrom(AuthenticationSettings securitySettings)
        {
            this.Security = securitySettings;
        }
    }
}
