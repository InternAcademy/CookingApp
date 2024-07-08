using System.Diagnostics.CodeAnalysis;
using CookingApp.Infrastructure.Common;
using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.Infrastructure.Configurations.Swagger;
using CookingApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using CookingApp.Services.Stripe;
using Stripe;
using CookingApp.Infrastructure.Configurations.Stripe;
using OpenAI.Extensions;
using OpenAI;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using CookingApp.Services.ChatService;
using OpenAI.Managers;
using Microsoft.Extensions.DependencyInjection;
using OpenAI.Interfaces;
using CookingApp.Services.Message;
using CookingApp.Services.UserProfile;

namespace CookingApp.Infrastructure.Extensions
{
    [ExcludeFromCodeCoverage]
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
                //if (swaggerConfig.Security != null)
                //{
                //    opts.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme()
                //    {
                //        Type = SecuritySchemeType.OAuth2,
                //        Flows = new OpenApiOAuthFlows()
                //        {
                //            Implicit = new OpenApiOAuthFlow
                //            {
                //                AuthorizationUrl = new Uri($"{swaggerConfig.Security.Authority}/connect/authorize"),
                //                TokenUrl = new Uri($"{swaggerConfig.Security.Authority}/connect/token"),
                //                Scopes = swaggerConfig.Security.Scopes
                //            }
                //        }
                //    });
                //    opts.AddSecurityRequirement(new OpenApiSecurityRequirement
                //    {
                //        {
                //            new OpenApiSecurityScheme
                //            {
                //                Reference = new OpenApiReference { Id = "oauth2", Type = ReferenceType.SecurityScheme }
                //            },
                //            swaggerConfig.Security.Scopes.Keys.ToArray()
                //        }
                //    });
                //}
            });
            return builder;
        }

        public static IHostApplicationBuilder AddMongoDatabase(this WebApplicationBuilder builder,
            Action<MongoConfiguration> configuration)
        {
            var mongoConfig = new MongoConfiguration();
            configuration(mongoConfig);

            IConvention ignoreIfDefaultOrNullConvention = mongoConfig.IgnoreIfDefaultConvention
                ? new IgnoreIfDefaultConvention(true)
                : new IgnoreIfNullConvention(mongoConfig.IgnoreIfNullConvention);

            var conventionPack = new ConventionPack
            {
                new CamelCaseElementNameConvention(),
                new EnumRepresentationConvention(mongoConfig.EnumConvention),
                ignoreIfDefaultOrNullConvention,
                new IgnoreExtraElementsConvention(true)
            };

            ConventionRegistry.Register("conventionPack", conventionPack, t => true);

            var settings = MongoClientSettings.FromUrl(new MongoUrl(mongoConfig.ConnectionString));

            var client = new MongoClient(settings);
            var database = client.GetDatabase(mongoConfig.Database);

            builder.Services.AddSingleton(database);
            builder.Services.AddSingleton(typeof(IMongoClient), p => client);
            builder.Services.AddSingleton(typeof(IRepository<>), typeof(Repository<>));

            builder.Services.Configure<MongoConfiguration>(configuration);

            BsonClassMap.RegisterClassMap<MongoEntity>(p =>
            {
                p.AutoMap();
                p.SetIgnoreExtraElements(true);
            });

            return builder;
        }

        public static IHostApplicationBuilder AddStripeIntegration(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<CustomerService>();
            builder.Services.AddScoped<PriceService>();
            builder.Services.AddScoped<ProductService>();
            builder.Services.AddScoped<SubscriptionService>();
            builder.Services.AddScoped<BalanceTransactionService>();
            string apiKey = builder.Configuration.GetValue<string>("StripeOptions:SecretKey") ?? string.Empty;
            string webhookSecret = builder.Configuration.GetValue<string>("StripeOptions:WebhookSecret") ?? string.Empty;

            builder.Services.Configure<StripeOptions>(options =>
            {
                options.SecretKey = apiKey;
                options.WebhookSecret = webhookSecret;
            });
            StripeConfiguration.ApiKey = apiKey;
            return builder;
        }

        public static IHostApplicationBuilder AddOpenAIIntegration(this WebApplicationBuilder builder)
        {
            builder.Services.AddOpenAIService();
            builder.Services.Configure<OpenAiOptions>(options =>
            {
                options.ApiKey = builder.Configuration.GetValue<string>("OpenAIOptions:ApiKey") ?? string.Empty;
                options.DefaultModelId = OpenAI.ObjectModels.Models.Gpt_3_5_Turbo;
            });

            builder.Services.AddScoped<IChatService, ChatService>();
            builder.Services.AddScoped<Services.Message.IMessageService, MessageService>();

            return builder;
        }

        public static IHostApplicationBuilder AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IStripeService, StripeService>();
            builder.Services.AddScoped<IUserProfileService, UserProfileService>();

            return builder;
        }
    }
}