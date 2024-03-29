using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class InitFieldResponseDto
{
    public string Message { get; set; }
}
