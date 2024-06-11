namespace CookingApp.Services.ChatHistory
{
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models.DTOs;
    using System.Text.Json;

    public class ChatService : IChatService
    {
        private readonly IRepository<Chat> _chatRepository;

        public ChatService(IRepository<Chat> chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task InsertAsync(Chat chat)
        {
            await _chatRepository.InsertAsync(chat);
        }

        public async Task<List<Chat>> GetAllChatsAsync()
        => await _chatRepository.GetAllAsync();

        public async Task<List<Tuple<string, string>>> GetAllByUserId(string userId)
        {
            var result = await _chatRepository.GetAllAsync(c => c.UserId == userId);
            return result.OrderBy(c => c.CreatedDateTime).Select(c => Tuple.Create(c.Title, c.Id)).ToList();
        }

        public async Task<Chat?> GetByIdAsync(string id)
            => await _chatRepository.GetByIdAsync(id);

        public async Task UpdateAsync(Chat chat)
        => await _chatRepository.UpdateAsync(chat);
    }
}
