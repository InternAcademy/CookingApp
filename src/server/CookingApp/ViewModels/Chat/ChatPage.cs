using CookingApp.Models.Entities;
using CookingApp.Models.Enums;
using CookingApp.ViewModels.Chat;
using Recipe = CookingApp.Models.Entities.Recipe;

namespace CookingApp.ViewModels.Recipes
{
    public class ChatPage
    {
        public int Page { get; set; } = default!;
        public IEnumerable<ChatDataResponse> Chats { get; set; } = default!;
        public int TotalPages { get; set; } = default!;
    }
}
