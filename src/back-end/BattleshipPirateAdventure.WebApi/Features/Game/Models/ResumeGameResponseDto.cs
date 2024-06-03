using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Shared.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class ResumeGameResponseDto(Guid gameId, GameDto game) : Resource
{
    public Guid Id { get; } = gameId;

    public GameDto game { get; set; } = game;
}
