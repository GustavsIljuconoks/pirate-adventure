using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class FieldSizeDto(int columns, int rows)
{
    public int Columns { get; set; } = columns;
    public int Rows { get; set; } = rows;
}
