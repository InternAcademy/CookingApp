using CookingApp.Infrastructure.Configurations.Database;
using CookingApp.Infrastructure.Configurations.Swagger;
using CookingApp.Infrastructure.Extensions;
using MongoDB.Bson;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using CookingApp.Infrastructure.Middleware;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory()
});

//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

builder.Configuration.AddEnvironmentVariables();
var swaggerSettings = builder.Configuration.GetSection("Swagger").Get<SwaggerSettings>()!;
var oAuthSettings = builder.Configuration.GetSection("SwaggerSecurity").Get<AuthenticationSettings>();
var mongoSettings = builder.Configuration.GetSection("Mongo").Get<MongoSettings>()!;

builder.AddDefaultMvcOptions(enforceAuthorization: true);
builder.AddSwagger(x =>
{
    x.LoadSettingsFrom(swaggerSettings);
    x.LoadSecuritySettingsFrom(oAuthSettings);
});
builder.AddCorsWithAcceptAll();
builder.AddMongoDatabase(p =>
{
    p.WithConnectionString(mongoSettings.Url);
    p.WithDatabaseName(mongoSettings.Database);
    p.WithSoftDeletes(o =>
    {
        o.Enabled(mongoSettings.SoftDeleteEnabled);
        o.HardDeleteAfter(TimeSpan.FromDays(mongoSettings.SoftDeleteRetentionInDays));
    });
    p.RepresentEnumValuesAs(BsonType.String);
    p.WithIgnoreIfDefaultConvention(false);
    p.WithIgnoreIfNullConvention(true);
});
builder.AddStripeIntegration();
builder.AddOpenAIIntegration();
builder.AddAzureBlob();
builder.AddServices();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration);

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Host.UseLogging(p =>
{
    p.WithConsoleSink(true);
    p.WithSeqSink(builder.Configuration["SeqServerUrl"]);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger(swaggerSettings, app.Environment.IsDevelopment());

app.UseRouting();

app.UseCors("CorsAllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

app.Run();

[ExcludeFromCodeCoverage]
public partial class Program { }