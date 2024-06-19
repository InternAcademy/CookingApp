using CookingApp.Models;
using OpenAI.ObjectModels.SharedModels;

namespace CookingApp.Services.Message
{
    public interface IMessageService
    {
        Task<MessageResponse> SendMessage(string chatId, string message);
    }
}
