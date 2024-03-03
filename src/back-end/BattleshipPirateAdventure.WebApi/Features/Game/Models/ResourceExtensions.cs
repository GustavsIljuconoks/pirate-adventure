using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public static class ResourceExtensions
{
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

        //var factory = controller.HttpContext.RequestServices.GetRequiredService<IUrlHelperFactory>();
        //factory.GetUrlHelper(controller.ControllerContext).Action()

        return resource.AddPostLink(controller.Url, routeName, routeValues);
    }
}
