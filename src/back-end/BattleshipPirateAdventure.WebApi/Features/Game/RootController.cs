using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("")]
public class RootController(ILogger<RootController> logger) : ControllerBase
{
    [HttpGet]
    [Route("", Name = nameof(Root))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public ActionResult<RootResponseDto> Root()
    {
        var result = new RootResponseDto();

        result.AddLink(this, nameof(GameController.MyGames));
        result.AddPostLink(this, nameof(GameController.CreateGame));

        return Ok(result);
    }
}
