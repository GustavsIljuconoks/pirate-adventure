using BattleshipPirateAdventure.Core;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class GameDto
{
    public Guid Id { get; set; }

    public int ColumnSize { get; set; }

    public int RowSize { get; set; }

    public GamePlayerDto? Player1 { get; set; }

    public GamePlayerDto? Player2 { get; set; }

    public GameState State { get; set; }
}

public static class GameExtensions
{
    public static GameDto MapFromDomain(this Core.Game game)
    {
        return new GameDto
        {
            Id = game.Id,
            ColumnSize = game.ColumnSize,
            RowSize = game.RowSize,
            Player1 = game.Player1?.MapFromDomain(),
            Player2 = game.Player2?.MapFromDomain(),
            State = game.State
        };
    }
}

[ExportTsInterface]
public class GamePlayerDto
{
    public string? Id { get; set; }

    public PlayerType PlayerType { get; set; }

    public PlayerState State { get; set; } = PlayerState.NotReady;
}

public static class GamePlayerExtensions
{
    public static GamePlayerDto MapFromDomain(this GamePlayer player)
    {
        return new GamePlayerDto { Id = player.Id, PlayerType = player.PlayerType, State = player.State };
    }
}
