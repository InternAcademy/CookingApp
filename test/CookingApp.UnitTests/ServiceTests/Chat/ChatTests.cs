namespace CookingApp.UnitTests.ServiceTests.Chat
{
    using Xunit;
    using Moq;
    using System;
    using System.Threading.Tasks;
    using AutoMapper;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.ViewModels.Chat;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Pagination;
    using System.Collections.Generic;
    using CookingApp.Services.ChatService;
    using CookingApp.Infrastructure.Enums;

    public class ChatTests
    {
        private readonly Mock<IRepository<Chat>> _repoMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly ChatService _chatService;

        public ChatTests()
        {
            _repoMock = new Mock<IRepository<Chat>>();
            _mapperMock = new Mock<IMapper>();
            _chatService = new ChatService(_repoMock.Object, _mapperMock.Object);
        }

        [Fact]
        public async Task CreateChat_Should_Create_And_Insert_New_Chat()
        {
            // Arrange
            var userId = "test-user-id";

            // Act
            var chat = await _chatService.CreateChat(userId);

            // Assert
            Assert.NotNull(chat);
            Assert.Equal(userId, chat.UserId);
            Assert.Empty(chat.Requests);
            Assert.Empty(chat.Responses);
            _repoMock.Verify(r => r.InsertAsync(It.IsAny<Chat>()), Times.Once);
        }

/*        [Fact]
        public async Task UpdateChat_Should_Update_Chat_With_Request_And_Response()
        {
            // Arrange
            var chatId = "test-chat-id";
            var request = new Message();
            var response = new Message();
            var existingChat = new Chat { Id = chatId };

            _repoMock.Setup(r => r.GetFirstOrDefaultAsync(It.IsAny<Func<Chat, bool>>()))
                     .ReturnsAsync(existingChat);

            // Act
            var chat = await _chatService.UpdateChat(chatId, request, response);

            // Assert
            Assert.NotNull(chat);
            Assert.Contains(request, chat.Requests);
            Assert.Contains(response, chat.Responses);
            _repoMock.Verify(r => r.UpdateAsync(It.IsAny<Chat>()), Times.Once);
        }*/

        [Fact]
        public async Task ArchiveChat_Should_Archive_Chat()
        {
            // Arrange
            var chatId = "test-chat-id";
            var existingChat = new Chat { Id = chatId, IsArchived = false };

            _repoMock.Setup(r => r.GetByIdAsync(chatId)).ReturnsAsync(existingChat);

            // Act
            await _chatService.ArchiveChat(chatId);

            // Assert
            Assert.True(existingChat.IsArchived);
            _repoMock.Verify(r => r.UpdateAsync(It.IsAny<Chat>()), Times.Once);
        }

/*        [Fact]
        public async Task DeleteChat_Should_Delete_Chat_By_Id()
        {
            // Arrange
            var chatId = "test-chat-id";

            // Act
            await _chatService.DeleteChat(chatId);

            // Assert
            _repoMock.Verify(r => r.DeleteByIdAsync(chatId), Times.Once);
        }*/

        [Fact]
        public async Task GetById_Should_Return_Chat_If_Found()
        {
            // Arrange
            var chatId = "test-chat-id";
            var existingChat = new Chat { Id = chatId };

            _repoMock.Setup(r => r.GetByIdAsync(chatId)).ReturnsAsync(existingChat);

            // Act
            var chat = await _chatService.GetById(chatId);

            // Assert
            Assert.NotNull(chat);
            Assert.Equal(chatId, chat.Id);
        }

        [Fact]
        public async Task GetById_Should_Throw_NotFoundException_If_Chat_Not_Found()
        {
            // Arrange
            var chatId = "test-chat-id";

            _repoMock.Setup(r => r.GetByIdAsync(chatId)).ReturnsAsync((Chat)null);

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(() => _chatService.GetById(chatId));
        }

/*        [Fact]
        public async Task GetActiveUserChats_Should_Return_Active_User_Chats()
        {
            // Arrange
            var userId = "test-user-id";
            var chats = new PagedList<Chat>(new List<Chat>(), 1, 1, 1, 1);
            var chatDataResponse = new PagedList<ChatDataResponse>(new List<ChatDataResponse>(), 1, 1, 1, 1);

            _repoMock.Setup(r => r.GetPagedListAsync(
                It.IsAny<int>(),
                It.IsAny<int>(),
                It.IsAny<Func<Chat, bool>>(),
                null,
                It.IsAny<SortDirection>(),
                It.IsAny<bool>())).ReturnsAsync(chats);

            _mapperMock.Setup(m => m.Map<PagedList<ChatDataResponse>>(It.IsAny<PagedList<Chat>>()))
                       .Returns(chatDataResponse);

            // Act
            var result = await _chatService.GetActiveUserChats(userId, 1);

            // Assert
            Assert.NotNull(result);
            _repoMock.Verify(r => r.GetPagedListAsync(
                It.IsAny<int>(),
                It.IsAny<int>(),
                It.IsAny<Func<Chat, bool>>(),
                null,
                It.IsAny<SortDirection>(),
                It.IsAny<bool>()), Times.Once);
            _mapperMock.Verify(m => m.Map<PagedList<ChatDataResponse>>(It.IsAny<PagedList<Chat>>()), Times.Once);
        }*/
    }
}
