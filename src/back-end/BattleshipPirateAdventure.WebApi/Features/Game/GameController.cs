using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using BattleshipPirateAdventure.WebApi.Features.Shared;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game")]
public class GameController(ILogger<GameController> logger, IBlobStorageService blobStorageService, IMemoryCache cache) : ControllerBase
{
    [HttpPost]
    [Route("create", Name = nameof(CreateGame))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<CreateGameResponseDto>> CreateGame(CreateGameRequestDto request)
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1(request.Player1);

        await blobStorageService.SaveGameAsync(game);

        logger.LogInformation($"Game `{game.Id}` created, Player 1: `{request.Player1}`");

        var result = new CreateGameResponseDto { Id = game.Id.ToString(), Size = new FieldSizeDto(10, 10), State = game.State };

        result.AddPostLink(this, nameof(Player1Controller.Player1InitField), new { gameId = game.Id });
        result.AddPostLink(this, nameof(JoinGame), new { gameId = game.Id });

        return Ok(result);
    }

    [HttpPost]
    [Route("{gameId:guid}/join", Name = nameof(JoinGame))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<JoinGameResponseDto>> JoinGame(JoinGameRequestDto request, Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        game.SetPlayer2(request.Player2);
        await blobStorageService.SaveGameAsync(game);

        logger.LogInformation($"Player 2 `{request.Player2}` joined the game `{game.Id}`");

        var result = new JoinGameResponseDto(gameId);
        result.AddPostLink(this, nameof(Player2Controller.Player2InitField), new { gameId = game.Id });

        return Ok(result);
    }

    [HttpGet]
    [Route("mygames", Name = nameof(MyGames))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult> MyGames(string playerName)
    {
        throw new NotImplementedException();
    }

    [HttpGet]
    [Route("getGame", Name = nameof(GetGame))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<GameDto>> GetGame(Guid gameId)
    {
        var game = await cache.GetOrCreateAsync(gameId, async _ => await blobStorageService.LoadGameAsync(gameId));

        if (game == null)
        {
            return NotFound();
        }

        return game.MapFromDomain();
    }

    [HttpPost]
    [Route("resume/{gameId:guid}", Name = nameof(ResumeGame))]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<ActionResult<GameDto>> ResumeGame(Guid gameId)
    {
        var game = await blobStorageService.LoadGameAsync(gameId);

        return game.MapFromDomain();
    }
}
