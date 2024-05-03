using CookingApp.Infrastructure.Configurations.Swagger;
using CookingApp.Infrastructure.Extensions;
using System.Diagnostics.CodeAnalysis;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory()
});

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Configuration.AddEnvironmentVariables();
var swaggerSettings = builder.Configuration.GetSection("Swagger").Get<SwaggerSettings>()!;

builder.AddDefaultMvcOptions(enforceAuthorization: true);
builder.AddSwagger(x => x.LoadSettingsFrom(swaggerSettings));
builder.AddCorsWithAcceptAll();

builder.Host.UseLogging(p =>
{
    p.WithConsoleSink(true);
    p.WithSeqSink(builder.Configuration["SeqServerUrl"]);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger(swaggerSettings);
}

app.UseRouting();

app.UseCors("CorsAllowAllOrigins");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

[ExcludeFromCodeCoverage]
public partial class Program { }