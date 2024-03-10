using BattleshipPirateAdventure.Core.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class CellDto
{
    public CellState State { get; set; }
}
