using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class LocationDto
{
    public int Row { get; set; }
    public int Column { get; set; }
}
