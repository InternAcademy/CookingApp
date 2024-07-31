using CookingApp.Infrastructure.Common;
using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.Infrastructure.Configurations.Stripe;
using CookingApp.Infrastructure.Configurations.Swagger;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Services.ChatService;
using CookingApp.Services.File;
using CookingApp.Services.Message;
using CookingApp.Services.OpenAI;
using CookingApp.Services.Stripe;
using CookingApp.Services.UserProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using OpenAI.Chat;
using Stripe;
using System.Diagnostics.CodeAnalysis;
using CookingApp.Services.Recipe;
using CookingApp.Services.Image;
using OpenAI.Images;
using CookingApp.Infrastructure.Filters;

using CookingApp.Services.Feedback;
using CookingApp.Services.Limitation;
using CookingApp.Services.CostCalculation;

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
                o.Filters.Add<PaginationHeadersFilter>();
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
            builder.Services.AddScoped<InvoiceService>();
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
            string apiKey = builder.Configuration.GetValue<string>("OpenAIOptions:ApiKey") ?? string.Empty;

            builder.Services.AddSingleton(new ChatClient(model: "gpt-4o", apiKey));
            builder.Services.AddSingleton(new ImageClient(model: "dall-e-3", apiKey));

            builder.Services.AddScoped<IChatService, ChatService>();
            builder.Services.AddScoped<IMessageService, MessageService>();
            builder.Services.AddScoped<IImageService, ImageService>();

            return builder;
        }

        public static IHostApplicationBuilder AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IStripeService, StripeService>();
            builder.Services.AddScoped<IUserProfileService, UserProfileService>();
            builder.Services.AddScoped<IRecipeService, RecipeService>();
            builder.Services.AddScoped<IFeedbackService, FeedbackService>();
            builder.Services.AddScoped<ILimitationService, LimitationService>();
            builder.Services.AddScoped<ICostCalculationService, CostCalculatioService>();

            return builder;
        }
    }
}