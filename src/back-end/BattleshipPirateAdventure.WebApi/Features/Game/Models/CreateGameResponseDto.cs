using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Shared.Models;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class CreateGameResponseDto : Resource
{
    public required string Id { get; set; }
    public required FieldSizeDto Size { get; set; }
    public GameState State { get; set; }
}
