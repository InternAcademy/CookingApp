namespace CookingApp.UnitTests.ServiceTests.OpenAI.Completions
{
    using global::MongoDB.Bson;
    using CookingApp.Infrastructure.Configurations.Database;
    using CookingApp.Infrastructure.Extensions;
    using CookingApp.Services.ChatService;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using System;

    public class ChatServiceIntegrationTests : IClassFixture<ChatServiceFixture>
    {
        private readonly IChatService _chatService;

        public ChatServiceIntegrationTests(ChatServiceFixture fixture)
        {
            _chatService = fixture.ChatService;
        }

        [Fact]
        public async Task EnsureExistingChatIsFoundAndContentIsUpdated()
        {
            // Arrange
            var initialMessage = "I need a simple and delicious recipe for dinner.";
            var initialChat = await _chatService.CreateChatAsync(initialMessage);

            var updatedMessage = "What beverage can you recommend for this dish?";
            await _chatService.UpdateChatAsync(updatedMessage, initialChat.Id);

            // Act
            var retrievedChat = await _chatService.GetByIdAsync(initialChat.Id);

            // Assert
            Assert.NotNull(retrievedChat);
            Assert.Equal(initialChat.Id, retrievedChat.Id);
            Assert.Contains(retrievedChat.Requests, r => r.Message == updatedMessage);
        }

        [Fact]
        public async Task EnsureChatIsDeleted()
        {
            // Arrange
            var initialMessage = "I need a simple and delicious recipe for dinner.";
            var newChat = await _chatService.CreateChatAsync(initialMessage);

            // Act
            await _chatService.DeleteAsync(newChat.Id);
            var retrievedChat = await _chatService.GetByIdAsync(newChat.Id);

            // Assert
            Assert.Null(retrievedChat);
        }
    }

    public class ChatServiceFixture : IDisposable
    {
        private readonly ServiceProvider _serviceProvider;
        public IChatService ChatService { get; private set; }

        public ChatServiceFixture()
        {
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions
            {
                ApplicationName = typeof(Program).Assembly.FullName,
                ContentRootPath = Directory.GetCurrentDirectory()
            });

            builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            var mongoSettings = builder.Configuration.GetSection("Mongo").Get<MongoSettings>()!;
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

            builder.AddOpenAIIntegration();
            builder.Host.UseLogging(p =>
            {
                p.WithConsoleSink(true);
                p.WithSeqSink(builder.Configuration["SeqServerUrl"]);
            });

            _serviceProvider = builder.Services.BuildServiceProvider();
            ChatService = _serviceProvider.GetRequiredService<IChatService>();
        }

        public void Dispose()
        {
            _serviceProvider?.Dispose();
        }
    }
}
