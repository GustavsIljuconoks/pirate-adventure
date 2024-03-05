using BattleshipPirateAdventure.WebApi.Features.Shared.Models;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class JoinGameResponseDto(Guid gameId) : Resource
{
    public Guid GameId { get; } = gameId;
}
