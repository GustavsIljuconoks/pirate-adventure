using BattleshipPirateAdventure.WebApi.Features.Shared.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Root.Models;

[ExportTsInterface]
public class PlayerGamesResponseDto : Resource
{
    public Guid gameId{ get; set; }
    public Status status { get; set; }
    public string player1 { get; set; }
    public string player2 { get; set; }
}

public enum Status
{
    Ongoing = 0,
    Winner = 1,
    Loser = 2,
}
