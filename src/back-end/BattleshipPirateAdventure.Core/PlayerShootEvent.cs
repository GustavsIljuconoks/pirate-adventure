using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class PlayerShootEvent
{
    public PlayerType Shooter { get; set; }
    public Scoring Scoring { get; set; }
    public Location ShotLocation { get; set; } = default!;
    public int? TargetShipId { get; set; }
    public DateTime ShotAt { get; set; }
}
