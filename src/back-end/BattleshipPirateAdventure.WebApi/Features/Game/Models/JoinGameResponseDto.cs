using BattleshipPirateAdventure.WebApi.Features.Shared.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class JoinGameResponseDto(Guid gameId) : Resource
{
    public Guid GameId { get; } = gameId;
}
