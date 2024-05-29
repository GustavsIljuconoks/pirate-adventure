using BattleshipPirateAdventure.WebApi.Features.Game;
using BattleshipPirateAdventure.WebApi.Features.Root.Models;
using BattleshipPirateAdventure.WebApi.Features.Shared;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Root;

[ApiController]
[Route("")]
public class RootController(ILogger<RootController> logger, ITableStorageService tableStorageService ) : ControllerBase
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
        result.AddPostLink(this, nameof(GameController.JoinGame), new { gameId = Guid.Empty });
        result.AddPostLink(this, nameof(GameController.GetGame), new { gameId = Guid.Empty });

        return Ok(result);
    }

    [HttpGet]
    [Route("leaderboard", Name = nameof(GetPlayers))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<LeaderboardResponseDto>> GetPlayers()
    {
        var result = await tableStorageService.GetLeaderboard();

        return Ok(result);
    }
}
