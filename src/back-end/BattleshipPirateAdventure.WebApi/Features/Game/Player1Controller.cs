using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game/{gameId:guid}/player1")]
public class Player1Controller(ILogger<Player1Controller> logger) : ControllerBase
{
    [HttpPost]
    [Route("init-field", Name = nameof(Player1InitField))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player1InitField(InitFieldRequestDto request, Guid gameId)
    {
        var engine = new GameEngine();
        var game = await engine.LoadGameAsync(gameId);

        if (game.HasPlayer1Joined)
        {
            game.Player1!.InitField(request.Ships.MapFromDto(game.Player1.Field));
            game.Player1!.SetReady();
        }

        await engine.SaveGameAsync(game);

        return Ok();
    }
}
