using BattleshipPirateAdventure.Core;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class GameFieldDto
{
    public Dictionary<int, CellDto[]> Cells { get; set; } = new();
}

public static class GameFieldExtensions
{
    public static GameFieldDto MapFromDomain(this GameField field)
    {
        return new GameFieldDto
        {
            Cells = field.Cells.ToDictionary(
                kv => kv.Key,
                kv => kv.Value.Select(c => new CellDto { State = c.State }).ToArray())
        };
    }
}
