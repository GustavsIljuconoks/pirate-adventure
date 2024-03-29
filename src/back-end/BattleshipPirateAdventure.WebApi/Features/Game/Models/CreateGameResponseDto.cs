using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Shared.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class CreateGameResponseDto : Resource
{
    public required string Id { get; set; }
    public required FieldSizeDto Size { get; set; }
    public GameState State { get; set; }
}
