using System.Text.Json.Serialization;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public abstract class Resource
{
    private readonly List<Link> _links = new();

    [JsonPropertyName("_links")]
    [JsonPropertyOrder(100)]
    public IEnumerable<Link> Links { get { return _links; } }

    public void AddLink(Link link)
    {
        _links.Add(link);
    }

    public void AddLinks(params Link[] links)
    {
        foreach (var link in links)
        {
            AddLink(link);
        }
    }
}