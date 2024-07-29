using System.ComponentModel.DataAnnotations;

namespace CookingApp.Common.EntityConstants
{
    public class MaxStringLengthInListAttribute(int maxLength) : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is List<string> list)
            {
                foreach (var str in list)
                {
                    if (str.Length > maxLength)
                    {
                        return new ValidationResult($"All strings in the list must be at most {maxLength} characters long.");
                    }
                }
            }

            return ValidationResult.Success!;
        }
    }
}
