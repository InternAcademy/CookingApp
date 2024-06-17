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
            var initialChat = _chatService.CreateChatAsync(initialMessage);

            if (initialChat.IsCompletedSuccessfully)
            {
                var chatId = initialChat.Result.Id;
                var updatedMessage = "What beverage can you recommend for this dish?";
                var chatUpdate = _chatService.UpdateChatAsync(updatedMessage, chatId);

                if (chatUpdate.IsCompletedSuccessfully)
                {
                    // Act
                    var retrievedChat = await _chatService.GetByApiGenIdAsync(chatId);

                    // Assert
                    Assert.NotNull(retrievedChat);
                    Assert.Equal(initialChat.Result.Id, retrievedChat.Id);
                    Assert.Contains(retrievedChat.Requests, r => r.Message == updatedMessage);
                }
            }            
        }

        [Fact]
        public async Task EnsureChatIsDeleted()
        {
            // Arrange
            var initialMessage = "I need a simple and delicious recipe for dinner.";
            var newChat = _chatService.CreateChatAsync(initialMessage);

            if (newChat.IsCompletedSuccessfully)
            {
                var chatId = newChat.Result.Id;

                // Act
                var actual = _chatService.DeleteAsync(chatId);
                var expected = 1;

                if (actual.IsCompletedSuccessfully)
                {
                    var retrievedChat = await _chatService.GetByApiGenIdAsync(chatId);

                    // Assert
                    Assert.Null(retrievedChat);
                    Assert.Equal(expected, actual.Result);
                }
            }
        }

        [Fact]
        public async Task EnsureNewChatIsStoredInTheDataBase()
        {
            // Arrange
            var userInput = "I need a simple and delicious recipe for dinner.";
            var newChat = _chatService.CreateChatAsync(userInput);

            if (newChat.IsCompletedSuccessfully)
            {
                // Act
                var retrievedChat = await _chatService.GetByApiGenIdAsync(newChat.Result.Id);

                // Assert
                Assert.NotNull(retrievedChat);
            }
        }

        [Theory]
        [InlineData("I need a simple and delicious recipe for dinner.")]
        [InlineData("What delicious meal can I cook with mackerel?")]
        [InlineData("Tell me a great lemonade recipe.")]
        public async Task EnsureNewChatRequestEqualsUserInput(string userInput)
        {
            // Arrange
            var newChat = _chatService.CreateChatAsync(userInput);

            if (newChat.IsCompletedSuccessfully)
            {
                // Act
                var retrievedChat = await _chatService.GetByApiGenIdAsync(newChat.Result.Id);

                // Assert
                Assert.Equal(userInput, retrievedChat.Requests.Select(r => r.Message).FirstOrDefault());
            }
        }

        [Fact]
        public async Task EnsureUpdatedChatReturnsResponse()
        {
            // Arrange
            var userInput = "I need a simple and delicious recipe for dinner.";
            var initialChat = await _chatService.CreateChatAsync(userInput);

            var updatedContent = "What beverage can you recommend for this dish?";

            // Act
            var response = _chatService.UpdateChatAsync(updatedContent, initialChat.Id);

            if (response.IsCompletedSuccessfully)
            {
                // Assert
                Assert.NotNull(response.Result);
            }
        }

        [Fact]
        public async Task EnsureExistingChatIsFoundAndRequestContentIsUpdated()
        {
            // Arrange
            var userInput = "I need a simple and delicious recipe for dinner.";
            var initialChat = await _chatService.CreateChatAsync(userInput);

            var updatedContent = "I have fish, potatoes and lemons.";
            var result = _chatService.UpdateChatAsync(updatedContent, initialChat.Id);

            if (result.IsCompletedSuccessfully)
            {
                // Act
                var retrievedChat = await _chatService.GetByApiGenIdAsync(initialChat.Id);
                var actual = retrievedChat.Requests.Count;
                var expected = 2;

                // Assert
                Assert.Equal(expected, actual);
            }
        }

        [Fact]
        public async Task EnsureExistingChatIsFoundAndResponsesContentIsUpdated()
        {
            // Arrange
            var userInput = "I need a simple and delicious recipe for dinner.";
            var initialChat = await _chatService.CreateChatAsync(userInput);

            var updatedContent = "I have fish, potatoes and lemons.";
            await _chatService.UpdateChatAsync(updatedContent, initialChat.Id);

            // Act
            var retrievedChat = _chatService.GetByApiGenIdAsync(initialChat.Id);


            if (retrievedChat.IsCompletedSuccessfully)
            {
                var actual = retrievedChat.Result.Responses.Count;
                var expected = 2;

                // Assert
                Assert.Equal(expected, actual);
            }
        }

        [Fact]
        public async Task EnsureExistingChatIsFoundAndIdsMatch()
        {
            // Arrange
            var userInput = "I need a simple and delicious recipe for dinner.";
            var initialChat = await _chatService.CreateChatAsync(userInput);

            var updatedContent = "What beverage can you recommend for this dish?";
            var result = _chatService.UpdateChatAsync(updatedContent, initialChat.Id);

            if (result.IsCompletedSuccessfully)
            {
                // Act
                var retrievedChat = await _chatService.GetByApiGenIdAsync(initialChat.Id);

                // Assert
                Assert.Equal(initialChat.Id, retrievedChat.ApiGeneratedId);
            }
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
