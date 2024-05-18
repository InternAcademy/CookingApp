using CookingApp.Infrastructure.Configurations.Logging;
using FluentAssertions;

namespace CookingApp.UnitTests.InfrastructureTests.Configurations
{
    public class LoggingConfigurationTests
    {
        [Fact]
        public void WithSeqSink_ShouldSetSeqServerUrl()
        {
            // Arrange
            var config = new LoggingConfiguration();
            var testUrl = "http://localhost:5341";

            // Act
            var result = config.WithSeqSink(testUrl);

            // Assert
            result.SeqServerUrl.Should().Be(testUrl);
            result.Should().BeEquivalentTo(config);
        }

        [Fact]
        public void WithConsoleSink_ShouldSetUseConsoleSink()
        {
            // Arrange
            var config = new LoggingConfiguration();
            var useConsole = false;

            // Act
            var result = config.WithConsoleSink(useConsole);

            // Assert
            result.UseConsoleSink.Should().Be(useConsole);
            result.Should().BeEquivalentTo(config);
        }

        [Fact]
        public void DefaultUseConsoleSink_ShouldBeTrue()
        {
            // Arrange & Act
            var config = new LoggingConfiguration();

            // Assert
            config.UseConsoleSink.Should().BeTrue();
        }
    }
}
