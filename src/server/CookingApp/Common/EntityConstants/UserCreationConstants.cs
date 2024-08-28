using CookingApp.Models;
using CookingApp.Models.Entities;
using CookingApp.Models.Enums;
using CookingApp.Models.ValueObjects;

namespace CookingApp.Common.EntityConstants
{
    public class UserCreationConstants
    {
        public static readonly Chat FamilySizedMargheritaPizzaChat = new Chat
        {
            Title = "Welcome to Meal Master!",
            Requests = new List<Message>
    {
        new Message
        {
            Type = MessageType.Text,
            Content = "Hey, what is Meal Master?",
            DateTime = DateTime.UtcNow
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "How can I use Meal Master?",
            DateTime = DateTime.UtcNow.AddSeconds(10)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "What are the possibilities with Meal Master?",
            DateTime = DateTime.UtcNow.AddSeconds(20)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Can I change the language or theme?",
            DateTime = DateTime.UtcNow.AddSeconds(30)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "How do I set my dietary preferences?",
            DateTime = DateTime.UtcNow.AddSeconds(40)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "What happens after I generate a meal?",
            DateTime = DateTime.UtcNow.AddSeconds(50)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "That sounds awesome! Thanks for the help.",
            DateTime = DateTime.UtcNow.AddSeconds(60)
        }
    },
            Responses = new List<Message>
    {
        new Message
        {
            Type = MessageType.Text,
            Content = "Hi there! Welcome to Meal Master, your ultimate cooking companion. Whether you're looking for recipe ideas, cooking tips, or meal planning assistance, I'm here to help you every step of the way. Just chat with me, and I'll guide you through everything!",
            DateTime = DateTime.UtcNow.AddSeconds(5)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Using Meal Master is super simple! You can chat with me about anything related to cooking—whether you're looking for tips, tricks, or specific recipes. Just ask, and I'll provide you with the information you need. You can even send me images of your ingredients, and I'll generate a recipe for you on the spot!",
            DateTime = DateTime.UtcNow.AddSeconds(15)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Meal Master offers a ton of features! You can:\n" +
                      "- Chat with me for cooking tips, tricks, recipes, and ideas.\n" +
                      "- Send images of your ingredients, and I'll create a recipe for you instantly.\n" +
                      "- Save recipes by tapping the 'Generate Meal' button when I respond with a recipe. After a minute, you'll find it waiting in the 'My Meals' tab in the upper right corner.\n" +
                      "- Set your dietary preferences in the 'Settings' tab under the user icon in the upper right. This way, I’ll know if you’re vegan, allergic to something, or just don’t like broccoli!\n" +
                      "- Customize your experience by changing the language and theme in the settings. You can choose from more than just dark and light modes!",
            DateTime = DateTime.UtcNow.AddSeconds(25)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Absolutely! You can personalize your experience by going to the 'Settings' tab (just click on the user icon in the upper right corner). There, you can switch between languages and choose from a variety of themes to suit your style. It’s more than just dark and light—find the one that’s perfect for you!",
            DateTime = DateTime.UtcNow.AddSeconds(35)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Great question! Head over to the 'Settings' tab under the user icon in the upper right corner. There, you can specify your dietary preferences, such as being vegan, gluten-free, or avoiding certain ingredients. This helps me tailor the recipes and suggestions to your needs, so you’ll always get the best possible recommendations!",
            DateTime = DateTime.UtcNow.AddSeconds(45)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "Once you hit the 'Generate Meal' button on a recipe I suggest, give it a minute, and you'll find your new meal in the 'My Meals' tab in the upper right corner. It’s that easy! From there, you can review your meals whenever you want.",
            DateTime = DateTime.UtcNow.AddSeconds(55)
        },
        new Message
        {
            Type = MessageType.Text,
            Content = "You're welcome! I’m here whenever you need assistance. Enjoy your time with Meal Master, and happy cooking! 🍳",
            DateTime = DateTime.UtcNow.AddSeconds(65)
        }
    }
        };
    }
}
