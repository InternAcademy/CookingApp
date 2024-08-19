using CookingApp.Models.Entities;
using CookingApp.Models.Enums;
using Recipe = CookingApp.Models.Entities.Recipe;

namespace CookingApp.ViewModels.Recipes
{
    public class RecipeCard
    {   
       
        public string UserId { get; set; } = default!;
        public string Title { get; set; } = default!;
        public bool IsArchived { get; set; }
        public string Description { get; set; } = default!;

        public string Duration { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;
        public int NumberOfPortions { get; set; }
    }
}
