namespace CookingApp.Services.OpenAI
{
    using CookingApp.ViewModels.Message;

    public interface IMessageService
    {
        Task<MessageResponse> SendMessage(string userId, MessageRequest message);
    }
}
