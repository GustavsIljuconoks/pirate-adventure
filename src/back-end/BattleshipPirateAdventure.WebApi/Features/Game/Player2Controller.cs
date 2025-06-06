using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game/{gameId:guid}/player2")]
public class Player2Controller(ILogger<Player2Controller> logger, IBlobStorageService blobStorageService, IMemoryCache cache) : ControllerBase
{
    [HttpPost]
    [Route("init-field", Name = nameof(Player2InitField))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player2InitField(InitFieldRequestDto request, Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        if (game.HasPlayer2Joined)
        {
            game.Player2!.InitField(request.Ships.MapFromDto(game.Player2.Field));
            game.SetReady(PlayerType.Player2);

            logger.LogInformation($"Player 2 ready for game `{gameId}`");
        }

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok();
    }

    [HttpPost]
    [Route("unready", Name = nameof(Player2Unready))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player2Unready(Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        if (game.HasPlayer1Joined)
        {
            game.SetNotReady(PlayerType.Player2);

            logger.LogInformation($"Player 1 is not ready for game `{gameId}`");
        }

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok();
    }

    [HttpPost]
    [Route("shoot", Name = nameof(Player2Shoot))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<ShotResultDto>> Player2Shoot(LocationDto targetCell, Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        var result = game.Player2Shoot(game.Player1!.Field.GetLocation(targetCell.Row, targetCell.Column));

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok(result.MapFromDomain());
    }
}
