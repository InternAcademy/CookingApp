namespace CookingApp.Services.OpenAI.Completions
{
    using global::OpenAI.ObjectModels.ResponseModels;

    public interface ICompletionService
    {
        Task<ChatCompletionCreateResponse> CreateCompletion(string message);

        Task<ChatCompletionCreateResponse> UpdateCompletion(string request, string? chatId = null);
    }
}
