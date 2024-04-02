using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class ShotResult(Location shotLocation, int? targetShipId, Scoring scoring)
{
    public Location ShotLocation { get; set; } = shotLocation;

    public Scoring Scoring { get; set; } = scoring;

    public int? TargetShipId { get; set; } = targetShipId;
}
