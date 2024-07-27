using System.Text.RegularExpressions;

namespace CookingApp.Common.Helpers.Messages
{
    public static class MessageHelper
    {
        public static string RemoveMarkdown(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return input;
            }

            input = Regex.Replace(input, @"^#{1,6}\s*", "", RegexOptions.Multiline);

            input = Regex.Replace(input, @"\[(.*?)\]\(.*?\)", "$1");

            input = Regex.Replace(input, @"!\[(.*?)\]\(.*?\)", "$1");

            input = Regex.Replace(input, @"(\*\*|__)(.*?)\1", "$2");
            input = Regex.Replace(input, @"(\*|_)(.*?)\1", "$2");
            input = Regex.Replace(input, @"(~~)(.*?)\1", "$2");

            input = Regex.Replace(input, @"`(.*?)`", "$1");

            input = Regex.Replace(input, @"^\s*>+\s*", "", RegexOptions.Multiline);

            input = Regex.Replace(input, @"^\s*[-*+]\s*", "", RegexOptions.Multiline);

            input = Regex.Replace(input, @"^\s*\d+\.\s*", "", RegexOptions.Multiline);

            input = Regex.Replace(input, @"^(-{3,}|_{3,}|\*{3,})\s*$", "", RegexOptions.Multiline);

            input = Regex.Replace(input, @"\\([`*_{}\[\]()#+\-.!])", "$1");

            input = Regex.Replace(input, @"(\r?\n){2,}", "\n\n");

            return input;
        }
    }
}
