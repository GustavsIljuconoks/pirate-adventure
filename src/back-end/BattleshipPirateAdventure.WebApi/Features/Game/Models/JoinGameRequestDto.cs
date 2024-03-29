using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class JoinGameRequestDto
{
    public required string Player2 { get; set; }
}
