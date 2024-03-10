using BattleshipPirateAdventure.Core.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class ShipDto
{
    public required string Name { get; set; }
    public int Size { get; set; }
    public required LocationDto HeadLocation { get; set; }
    public Orientation Orientation { get; set; }
}
