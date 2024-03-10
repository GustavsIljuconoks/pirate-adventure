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

    public PlayerType NextMove { get; set; }
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
            State = game.State,
            NextMove = game.NextMove
        };
    }
}
