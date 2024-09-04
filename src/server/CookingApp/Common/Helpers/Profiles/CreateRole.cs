namespace CookingApp.Common.Helpers.Profiles
{
    using CookingApp.Models;
    using CookingApp.Models.Enums;
    using CookingApp.Models.ValueObjects;

    public static class CreateRole
    {
        public static Role Basic(Limitations limitations, int messages, int recipes)
        {
            return new Role()
            {
                Type = RoleType.Basic,
                Limitations = new Limitations()
                {
                    ChatFromDate = DateTime.Now,
                    ChatGeneration = limitations.ChatGeneration + messages,
                    RecipeGeneration = limitations.RecipeGeneration + recipes
                }
            };
        }
        public static Role Premium(Limitations limitations, int messages, int recipes)
        {
            return new Role()
            {
                Type = RoleType.Premium,
                Limitations = new Limitations()
                {
                    ChatFromDate = DateTime.Now,
                    ChatGeneration = limitations.ChatGeneration + messages,
                    RecipeGeneration = limitations.RecipeGeneration + recipes
                }
            };
        }
    }
}
