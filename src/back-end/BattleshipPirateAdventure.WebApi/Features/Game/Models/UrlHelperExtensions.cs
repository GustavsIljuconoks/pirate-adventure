using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public static class UrlHelperExtensions
{
    public static string LinkPathAndQuery(this IUrlHelper url, string routeName, object? routeValues = null)
    {
        var uri = new Uri(url.Link(routeName, routeValues)!);
        return uri.PathAndQuery;
    }
}