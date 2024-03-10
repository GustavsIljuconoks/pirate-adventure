using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class ShotResult(Location shotLocation, Ship? targetShip, Scoring scoring)
{
    public Location ShotLocation { get; set; } = shotLocation;

    public Scoring Scoring { get; set; } = scoring;

    public Ship? TargetShip { get; set; } = targetShip;
}
