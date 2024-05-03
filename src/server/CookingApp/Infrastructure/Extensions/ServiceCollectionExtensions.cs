using CookingApp.Infrastructure.Configurations.Swagger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace CookingApp.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IMvcBuilder AddDefaultMvcOptions(this WebApplicationBuilder builder,
            bool enforceAuthorization = true)
        {
            builder.Services.AddLogging();
            builder.Services.AddOptions();
            builder.Services.AddHttpClient();
            builder.Services.AddHttpContextAccessor();

            builder.Services.Configure<RouteOptions>(x => x.LowercaseUrls = true);
            return builder.Services.AddMvc(o =>
            {
                if (enforceAuthorization)
                {
                    o.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().RequireAuthenticatedUser()
                        .Build()));
                }
            }).AddNewtonsoftJson(p =>
            {
                p.SerializerSettings.Formatting = Formatting.Indented;
                p.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                p.SerializerSettings.Converters.Add(new StringEnumConverter(new DefaultNamingStrategy(), false));
            });
        }
        public static void AddCorsWithAcceptAll(this WebApplicationBuilder builder, string policyName = "CorsAllowAllOrigins")
        {
            builder.Services.AddCors(p => p.AddPolicy(policyName, b => b
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()));
        }

        /// <summary>
        /// Adds Swagger with the provided <see cref="SwaggerConfiguration"/>
        /// </summary>
        /// <param name="services">Services Collection</param>
        /// <param name="configuration">Swagger Configuration</param>
        public static IHostApplicationBuilder AddSwagger(this WebApplicationBuilder builder, Action<SwaggerConfiguration> configuration)
        {
            var swaggerConfig = new SwaggerConfiguration();
            configuration(swaggerConfig);

            var settings = swaggerConfig.Settings;

            settings.ValidateAndThrow();
            var apiVersion = settings.ApiVersionText;

            builder.Services.AddSwaggerGen(opts =>
            {
                opts.SwaggerDoc(apiVersion, new OpenApiInfo()
                {
                    Title = settings.ApiName,
                    Version = apiVersion
                });
            });
            return builder;
        }
    }
}
