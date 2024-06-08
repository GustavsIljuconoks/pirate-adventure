using BattleshipPirateAdventure.WebApi.Features.Shared.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Root.Models;

[ExportTsInterface]
public class LeaderboardResponseDto : Resource
{
    public string name { get; set; }
    public int cups { get; set; }
}
