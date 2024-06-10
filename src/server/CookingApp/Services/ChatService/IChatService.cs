namespace CookingApp.Services.ChatHistory
{
    public interface IChatService
    {
        Task InsertAsync(Chat chat);

        Task<List<Chat>> GetAllChatsAsync();

        Task<List<Tuple<string, string>>> GetAllByUserId(string userId);

        Task<Chat?> GetByIdAsync(string id);

        Task UpdateAsync(Chat chat);
    }
}
