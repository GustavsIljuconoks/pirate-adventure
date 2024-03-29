
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class CreateGameRequestDto
{
    public required string Player1 { get; set; }
}
