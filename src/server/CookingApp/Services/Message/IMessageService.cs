namespace CookingApp.Services.OpenAI
{
    using CookingApp.ViewModels.Message;

    public interface IMessageService
    {
        Task<MessageData> SendMessage(string userId, MessageData message);
    }
}
