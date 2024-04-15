using BattleshipPirateAdventure.Core;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class ShotResultDto
{
    public required LocationDto ShotLocation { get; set; }

    public Scoring Scoring { get; set; }

    public int? TargetShipId { get; set; }
}

public static class ShotResultDtoExtensions
{
    public static ShotResultDto MapFromDomain(this ShotResult result)
    {
        return new ShotResultDto
        {
            Scoring = result.Scoring, TargetShipId = result.TargetShipId, ShotLocation = result.ShotLocation.MapFromDomain()
        };
    }
}
