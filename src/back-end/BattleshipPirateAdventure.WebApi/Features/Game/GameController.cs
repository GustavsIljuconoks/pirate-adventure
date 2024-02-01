using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.Game;

[ApiController]
[Route("game")]
public class GameController(ILogger<GameController> logger) : ControllerBase
{
    [HttpPost]
    [Route("create", Name = nameof(CreateGame))]
    public async Task<ActionResult<CreateGameResponseDto>> CreateGame(CreateGameRequestDto request)
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1(request.Player1);

        await engine.SaveGameAsync(game);

        logger.LogInformation($"Game `{game.Id}` created");

        return Ok(new CreateGameResponseDto
        {
            Id = game.Id.ToString(),
            Size = new FieldSizeDto(10, 10),
            State = game.State
        });
    }

    [HttpPost]
    [Route("{gameId:guid}/join", Name = nameof(JoinGame))]
    public async Task<ActionResult<CreateGameResponseDto>> JoinGame(JoinGameRequestDto request, Guid gameId)
    {
        var engine = new GameEngine();
        var game = await engine.LoadGameAsync(gameId);

        game.SetPlayer2(request.Player2);

        await engine.SaveGameAsync(game);

        logger.LogInformation($"Player2 joined game `{game.Id}`");

        return Ok();
    }

    [HttpPost]
    [Route("{gameId:guid}/init-field", Name = nameof(InitField))]
    public async Task<ActionResult<InitFieldResponse>> InitField(InitFieldRequestDto request, Guid gameId)
    {
        var engine = new GameEngine();
        var game = await engine.LoadGameAsync(gameId);

        if (!string.IsNullOrEmpty(request.Player1) && game.HasPlayer1Joined)
        {
            game.Player1!.InitField(MapFromDto(request.Ships, game.Player1.Field));
        }

        if (!string.IsNullOrEmpty(request.Player2) && game.HasPlayer2Joined)
        {
            game.Player2!.InitField(MapFromDto(request.Ships, game.Player2.Field));
        }

        await engine.SaveGameAsync(game);

        return Ok();
    }

    private List<Ship> MapFromDto(List<ShipDto> ships, GameField field)
    {
        return ships
            .Select(x => new Ship(x.Name,
                                  x.Size,
                                  field.GetLocation(x.HeadLocation.Column, x.HeadLocation.Row),
                                  x.Orientation))
            .ToList();
    }
}

public class InitFieldResponse
{
    public string Message { get; set; }
}
