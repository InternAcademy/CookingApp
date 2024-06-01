namespace CookingApp.Services.OpenAI.Completions
{
    using global::OpenAI.ObjectModels.RequestModels;
    using global::OpenAI.ObjectModels;
    using global::OpenAI.Interfaces;

    /// <summary>
    /// This class it to assist with the personal needs of the user. 
    /// After defining their dietary/allergic needs the chat completion 
    /// will fill them in for the chatbot to take into account.
    /// </summary>
    public class Recipe<T>
    {
        // field for UserSettingsDbService
        // field for userManagerService
        private readonly IOpenAIService _openAIService;

        public Recipe(IOpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        public async Task<T> CreateCompletion()
        {
            // var user = await _userManager.GetUser();
            // var userAllergies = await _userSettings.Where(x => x.UserId == user.Id).Select(x => x.Allergies).ToListAsync();

            var userAllergies = new List<string> { "peanuts", "almonds", "eggs" };

            var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<ChatMessage>
                {
                    // Creating a prompt for the chatboot to answer a question about cooking/diatery needs.
                    ChatMessage.FromSystem("You are a helpful assistant that answers questions related to cooking tips, recipes, kitchen tips. " +
                    "You will receive queries containing different questions on cooking thematic or a list of products that you have to make use of and come up with a recipe for the user." +
                    "You need to take into account the user's dietary needs and their allergies so that you do not suggest a recipe that includes unhealthy or inappropriate contents. " +
                    $"Here is a list of the user's allergies: {userAllergies}."),
                    ChatMessage.FromUser("I have a list of ingredients and I need to cook something for myself. Suggest a suitable recipe: Fish, Potatoes, Garlic, Dill, Olive oil."),
                    ChatMessage.FromAssistant("Given your ingredients—fish, potatoes, garlic, dill, and olive oil—here's a recipe for a delicious and simple dish: Garlic and Dill Baked Fish with Roasted Potatoes." +
                    "\r\n" +
                    "\r\nGarlic and Dill Baked Fish with Roasted Potatoes" +
                    "\r\nIngredients:" +
                    "\r\nFish fillets (e.g., cod, tilapia, or salmon)" +
                    "\r\nPotatoes (Yukon Gold or red potatoes work well)" +
                    "\r\n3-4 cloves of garlic, minced" +
                    "\r\nFresh dill, chopped" +
                    "\r\nOlive oil" +
                    "\r\nSalt and pepper to taste" +
                    "\r\nOptional: Lemon wedges for serving" +
                    "\r\nInstructions:" +
                    "\r\nPreheat the Oven:" +
                    "\r\n" +
                    "\r\nPreheat your oven to 400°F (200°C)." +
                    "\r\nPrepare the Potatoes:" +
                    "\r\n" +
                    "\r\nWash and cut the potatoes into small, even-sized chunks or wedges." +
                    "\r\nPlace the potato pieces on a baking sheet. Drizzle with olive oil, and sprinkle with salt and pepper." +
                    "\r\nToss the potatoes to coat them evenly." +
                    "\r\nPlace the baking sheet in the oven and roast for about 25-30 minutes, or until the potatoes are golden and crispy. Stir once halfway through cooking." +
                    "\r\nPrepare the Fish:" +
                    "\r\n" +
                    "\r\nWhile the potatoes are roasting, place the fish fillets on another baking sheet lined with parchment paper or lightly greased with olive oil." +
                    "\r\nIn a small bowl, mix the minced garlic, chopped dill, a pinch of salt, and a couple of tablespoons of olive oil." +
                    "\r\nSpoon the garlic and dill mixture over the fish fillets, spreading it evenly." +
                    "\r\nBake the Fish:" +
                    "\r\n" +
                    "\r\nAfter the potatoes have been in the oven for about 15 minutes, place the baking sheet with the fish in the oven." +
                    "\r\nBake the fish for 10-15 minutes, depending on the thickness of the fillets. The fish should be opaque and flake easily with a fork when done." +
                    "\r\nServe:\r\n" +
                    "\r\nRemove both the fish and potatoes from the oven." +
                    "\r\nServe the baked fish with a side of roasted potatoes." +
                    "\r\nOptionally, garnish with additional fresh dill and serve with lemon wedges for an extra burst of flavor." +
                    "\r\nNotes:" +
                    "\r\nEnsure the baking sheets are not overcrowded to allow for even cooking." +
                    "\r\nAdjust the seasoning according to your taste preference." +
                    "\r\nFeel free to add other herbs or spices that you like." +
                    "\r\nEnjoy your meal!"),
                    ChatMessage.FromUser("Where was it played?")
                },
                Model = Models.Gpt_4o,
            });
            if (completionResult.Successful)
            {
                Console.WriteLine(completionResult.Choices.First().Message.Content);
            }
        }
    }
}
