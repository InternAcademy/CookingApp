namespace CookingApp.Services.ChatHistory
{
    using CookingApp.Models.DTOs;
    using OpenAI.ObjectModels.ResponseModels;

    public interface IChatService
    {
        Task InsertAsync(CreateChatDTO chat);

        Task<List<Chat>> GetAllChatsAsync();

        Task<List<Tuple<string, string>>> GetAllByUserId(string userId);

        Task<Chat?> GetByIdAsync(string id);

        Task UpdateAsync(Chat chat);

        Task<int> DeleteAsync(string id);

        Task<ChatCompletionCreateResponse> CreateChatAsync(string request);

        Task<ChatCompletionCreateResponse> UpdateChatAsync(string request, string? chatId);
    }
}
