using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game/{gameId:guid}/player1")]
public class Player1Controller(ILogger<Player1Controller> logger, IBlobStorageService blobStorageService, IMemoryCache cache) : ControllerBase
{
    [HttpPost]
    [Route("init-field", Name = nameof(Player1InitField))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player1InitField(InitFieldRequestDto request, Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        if (game.HasPlayer1Joined)
        {
            game.Player1!.InitField(request.Ships.MapFromDto(game.Player1.Field));
            game.SetReady(PlayerType.Player1);

            logger.LogInformation($"Player 1 ready for game `{gameId}`");
        }

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok();
    }

    [HttpPost]
    [Route("unready", Name = nameof(Player1Unready))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<InitFieldResponseDto>> Player1Unready(Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        if (game.HasPlayer1Joined)
        {
            game.SetNotReady(PlayerType.Player1);

            logger.LogInformation($"Player 1 is not ready for game `{gameId}`");
        }

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok();
    }

    [HttpPost]
    [Route("shoot", Name = nameof(Player1Shoot))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<ShotResultDto>> Player1Shoot(LocationDto targetCell, Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        var result = game.Player1Shoot(game.Player2!.Field.GetLocation(targetCell.Row, targetCell.Column));

        await blobStorageService.SaveGameAsync(game);
        cache.Set(gameId, game);

        return Ok(result.MapFromDomain());
    }
}
