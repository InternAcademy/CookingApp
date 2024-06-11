namespace CookingApp.UnitTests.ServiceTests.OpenAI.Completions
{
    using CookingApp.Infrastructure.Configurations.Database;
    using CookingApp.Infrastructure;
    using CookingApp.Services.ChatHistory;
    using global::MongoDB.Driver;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using System;
    using global::OpenAI.Managers;
    using global::OpenAI.Interfaces;
    using CookingApp.Infrastructure.Interfaces;

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
        private readonly IOpenAIService _openAIService;
        private readonly ILogger<ChatService> _logger;
        private readonly IRepository<Chat> _chatRepo;
        private readonly IRepository<User> _userRepo;

        public IChatService ChatService { get; set; }

        public ChatServiceFixture(
            IOpenAIService openAIService, 
            ILogger<ChatService> logger, 
            IRepository<Chat> chatRepo, 
            IRepository<User> userRepo)
        {
            _openAIService = openAIService;
            _logger = logger;
            _chatRepo = chatRepo;
            _userRepo = userRepo;
        }

        public ChatServiceFixture()
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            var configuration = Options.Create(new MongoConfiguration());
            var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
            var chatRepository = new Repository<Chat>(mongoClient, configuration, loggerFactory);
            ChatService = new ChatService(_openAIService, _logger, _chatRepo, _userRepo);
        }

        public void Dispose()
        {
            // Clean up resources if necessary
        }
    }
}
