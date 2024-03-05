using System.Diagnostics.CodeAnalysis;

namespace BattleshipPirateAdventure.WebApi.Features.Shared;

public static class StringExtensions
{
    public static string ToCamelCase(this string input)
    {
        return input.IsNotEmpty() && input.Length > 1
            ? char.ToLowerInvariant(input[0]) + input.Substring(1)
            : input;
    }

    public static bool IsNotEmpty([NotNullWhen(true)] this string? source)
    {
        return !string.IsNullOrEmpty(source);
    }
}
