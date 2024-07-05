using CookingApp.Models.Entities;
using CookingApp.Models.ValueObjects;
using System.Text.RegularExpressions;
using CookingApp.Models.Enums;

namespace CookingApp.Common.Helpers.Recipes
{
    public class RecipeHelpers
    {
        private static readonly TimeSpan RegexTimeout = TimeSpan.FromSeconds(2); // Set the timeout to 2 seconds

        public static bool TryParseRecipe(string response, out Recipe recipe)
        {
            throw new NotImplementedException();
        }
    }
}
