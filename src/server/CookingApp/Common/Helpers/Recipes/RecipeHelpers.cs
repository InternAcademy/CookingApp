using CookingApp.Models.Entities;
using CookingApp.Models.ValueObjects;
using System.Text.RegularExpressions;
using CookingApp.Models.Enums;

namespace CookingApp.Common.Helpers.Recipes
{
    public class RecipeHelpers
    {
        private static readonly string[] RequiredSections =
        [
            "Title:",
            "Description:",
            "Ingredients:",
            "Preparation Steps:",
            "Duration:",
            "Number Of Portions:"
        ];

        public static bool IsRecipe(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return false;
            }

            return RequiredSections.All(section => text.Contains(section, StringComparison.OrdinalIgnoreCase));
        }
    }
}
