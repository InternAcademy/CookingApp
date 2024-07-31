using CookingApp.Models.Entities;
using CookingApp.Models.Enums;
using Recipe = CookingApp.Models.Entities.Recipe;

namespace CookingApp.ViewModels.Recipes
{
    public class RecipePage
    {
        public int Page { get; set; } = default!;
        public IEnumerable<Recipe> Recipes { get; set; } = default!;
        public long TotalPages { get; set; } = default!;
    }
}
