using CookingApp.Infrastructure.Configurations.Logging;
using CookingApp.Infrastructure.Configurations.Swagger;
using Serilog;
using Serilog.Events;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Diagnostics;

namespace CookingApp.Infrastructure.Extensions
{
    public static class HostBuilderExtensions
    {
        public static IHostBuilder UseLogging(this IHostBuilder builder, Action<LoggingConfiguration> configuration)
        {
            var loggingConfig = new LoggingConfiguration();
            configuration(loggingConfig);

            builder.UseSerilog((hostingContext, loggerConfiguration) =>
            {
                loggerConfiguration
                    .ReadFrom.Configuration(hostingContext.Configuration)
                    .Enrich.FromLogContext()
                    .Enrich.WithAssemblyName()
                    .Enrich.WithAssemblyVersion();

                if (!string.IsNullOrEmpty(loggingConfig.SeqServerUrl))
                {
                    loggerConfiguration.WriteTo.Seq(loggingConfig.SeqServerUrl);
                }

                if (loggingConfig.UseConsoleSink)
                {
                    loggerConfiguration.WriteTo.Console();
                }

                if (Debugger.IsAttached)
                {
                    loggerConfiguration.MinimumLevel.Override("Microsoft", LogEventLevel.Error);
                    loggerConfiguration.MinimumLevel.Override("System", LogEventLevel.Error);
                    loggerConfiguration.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning);
                }
            });
            return builder;
        }

        /// <summary>
        /// Adds Swagger and Swagger UI with Swagger Settings
        /// </summary>
        /// <param name="builder">Application Builder</param>
        /// <param name="swaggerSettings">Swagger Settings</param>
        public static void UseSwagger(this IApplicationBuilder builder, SwaggerSettings swaggerSettings)
        {
            if (swaggerSettings == null)
            {
                throw new ArgumentNullException(nameof(swaggerSettings));
            }

            swaggerSettings.ValidateAndThrow();

            var options = new SwaggerUIOptions
            {
                DocumentTitle = swaggerSettings.ApiName
            };

            if (!string.IsNullOrEmpty(swaggerSettings.RoutePrefix))
            {
                options.RoutePrefix = swaggerSettings.RoutePrefix;
            }

            // Configure Swagger
            builder.UseSwagger(p =>
            {
                p.RouteTemplate = swaggerSettings.JsonRoute;
            });

            options.SwaggerEndpoint(swaggerSettings.UiEndpoint, swaggerSettings.ApiName);
            options.DisplayRequestDuration();
            options.DocExpansion(DocExpansion.None);

            builder.UseSwagger(p => p.RouteTemplate = swaggerSettings.JsonRoute);
            builder.UseSwaggerUI(p =>
            {
                p.SwaggerEndpoint(swaggerSettings.UiEndpoint, swaggerSettings.ApiName);
                p.DocExpansion(DocExpansion.None);
                p.DisplayRequestDuration();
                p.DocumentTitle = swaggerSettings.ApiName;
                p.RoutePrefix = swaggerSettings.RoutePrefix;
            });

            builder.UseMiddleware<SwaggerUIMiddleware>(options);
        }
    }
}
