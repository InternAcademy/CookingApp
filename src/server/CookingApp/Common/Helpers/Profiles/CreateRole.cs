using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models;
using CookingApp.Models.Enums;
using CookingApp.Models.ValueObjects;
using System.Security.Claims;

namespace CookingApp.Common.Helpers.Profiles
{
    public static class CreateRole
    {
        public static Role Free()
        {
            return new Role()
            {
                Type = RoleType.Free,
                Limitations = new Limitations()
                {
                    ChatFromDate = DateTime.Now,
                    ChatGeneration = 20,  
                    RecipeGeneration = 0
                }
            };
        }
        public static Role Premium()
        {
            return new Role()
            {
                Type = RoleType.Premium,
                Limitations = new Limitations()
                {
                    RecipeGeneration = 20
                }
            };
        }
    }
}
