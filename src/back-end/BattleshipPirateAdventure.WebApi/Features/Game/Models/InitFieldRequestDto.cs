using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class InitFieldRequestDto
{
    public required List<ShipDto> Ships { get; set; }
}
