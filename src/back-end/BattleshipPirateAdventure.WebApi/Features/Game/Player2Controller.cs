using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game/{gameId:guid}/player2")]
public class Player2Controller(ILogger<Player2Controller> logger) : ControllerBase
{
    [HttpPost]
    [Route("init-field", Name = nameof(Player2InitField))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player2InitField(InitFieldRequestDto request, Guid gameId)
    {
        var engine = new GameEngine();
        var game = await engine.LoadGameAsync(gameId);

        if (game.HasPlayer2Joined)
        {
            game.Player2!.InitField(request.Ships.MapFromDto(game.Player2.Field));
            game.SetReady(PlayerType.Player2);

            logger.LogInformation($"Player 2 ready for game `{gameId}`");
        }

        await engine.SaveGameAsync(game);

        return Ok();
    }

    [HttpPost]
    [Route("shoot", Name = nameof(Player2Shoot))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<ShotResultDto>> Player2Shoot(LocationDto targetCell, Guid gameId)
    {
        var engine = new GameEngine();
        var game = await engine.LoadGameAsync(gameId);

        var result = game.Player2Shoot(game.Player1!.Field.GetLocation(targetCell.Row, targetCell.Column));

        await engine.SaveGameAsync(game);

        return Ok(result.MapFromDomain());
    }
}
