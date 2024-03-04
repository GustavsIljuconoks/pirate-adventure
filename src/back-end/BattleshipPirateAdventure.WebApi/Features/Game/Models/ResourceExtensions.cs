using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public static class ResourceExtensions
{
    public static Resource AddLink(
        this Resource resource,
        IUrlHelper url,
        string routeName,
        object? routeValues = null)
    {
        resource.AddLink(new GetLink(routeName.ToCamelCase(), url.LinkPathAndQuery(routeName, routeValues)));
        return resource;
    }

    public static Resource AddLink(
        this Resource resource,
        ControllerBase controller,
        string routeName,
        object? routeValues = null)
    {
        return resource.AddLink(controller.Url, routeName, routeValues);
    }

    public static Resource AddPostLink(
        this Resource resource,
        IUrlHelper url,
        string routeName,
        object? routeValues = null)
    {
        resource.AddLink(new CreateLink(routeName.ToCamelCase(), url.LinkPathAndQuery(routeName, routeValues)));
        return resource;
    }

    public static Resource AddPostLink(
        this Resource resource,
        ControllerBase controller,
        string routeName,
        object? routeValues = null)
    {
        return resource.AddPostLink(controller.Url, routeName, routeValues);
    }
}
