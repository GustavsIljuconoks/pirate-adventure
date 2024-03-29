using System.Text.Json.Serialization;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Shared.Models;

[ExportTsInterface]
public abstract class Resource
{
    private readonly List<Link> _links = new();

    [JsonPropertyName("_links")]
    [TsMemberName("_links")]
    [JsonPropertyOrder(100)]
    public IEnumerable<Link> Links => _links;

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
