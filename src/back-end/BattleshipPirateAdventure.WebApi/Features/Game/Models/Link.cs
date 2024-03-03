namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class Link(string rel, string href, HttpMethod method)
{
    public string Rel { get; } = rel ?? throw new ArgumentNullException(nameof(rel));
    public string Href { get; } = href ?? throw new ArgumentNullException(nameof(href));
    public string Method { get; } = method.ToString() ?? throw new ArgumentNullException(nameof(method));
}