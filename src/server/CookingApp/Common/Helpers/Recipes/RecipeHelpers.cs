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
        private static readonly string GUIDConstant = "b66315d3-507c";

        public static bool IsRecipe(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return false;
            }

            return text.Contains(GUIDConstant, StringComparison.OrdinalIgnoreCase) || RequiredSections.All(text.Contains);
        }

        public static string UpdateRecipe(string text)
        {
            if (text.Contains(GUIDConstant, StringComparison.OrdinalIgnoreCase))
            {
                return text.Replace(GUIDConstant, string.Empty);
            }

            return text;
        }
    }
}
