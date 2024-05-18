using CookingApp.Infrastructure.Configurations.Swagger;
using FluentAssertions;

namespace CookingApp.UnitTests.InfrastructureTests.Configurations
{
    public class SwaggerSettingsTests
    {
        [Fact]
        public void ApiVersionText_ShouldReturnCorrectFormat()
        {
            // Arrange
            var settings = new SwaggerSettings { ApiVersion = "2.5.0" };

            // Act
            var versionText = settings.ApiVersionText;

            // Assert
            versionText.Should().Be("v2");
        }

        [Fact]
        public void WithRoutePrefix_ShouldSetRoutePrefix()
        {
            // Arrange
            var settings = new SwaggerSettings();
            var prefix = "api";

            // Act
            var result = settings.WithRoutePrefix(prefix);

            // Assert
            settings.RoutePrefix.Should().Be(prefix);
            result.Should().BeSameAs(settings);
        }

        [Fact]
        public void ValidateAndThrow_ShouldNotThrow_WhenSettingsAreValid()
        {
            // Arrange
            var settings = new SwaggerSettings { ApiName = "My API", JsonRoute = "v1/swagger.json", UiEndpoint = "v1/swagger.json" };

            // Act & Assert
            var act = () => settings.ValidateAndThrow();

            // Assert
            act.Should().NotThrow();
        }

        [Theory]
        [InlineData(null, "v1/swagger.json", "v1/swagger.json")] // Missing ApiName
        [InlineData("My API", null, "v1/swagger.json")] // Missing JsonRoute
        [InlineData("My API", "v1/swagger.json", null)] // Missing UiEndpoint
        public void ValidateAndThrow_ShouldThrowArgumentNullException_WhenSettingsAreInvalid(string apiName, string jsonRoute, string uiEndpoint)
        {
            // Arrange
            var settings = new SwaggerSettings { ApiName = apiName, JsonRoute = jsonRoute, UiEndpoint = uiEndpoint };

            // Act
            var act = () => settings.ValidateAndThrow();

            // Assert
            act.Should().Throw<ArgumentNullException>();
        }
    }
}
