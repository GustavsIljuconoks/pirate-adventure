using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class PlayerShootEvent
{
    public int Id { get; set; }

    public int Shooter { get; set; }

    public int Scoring { get; set; }

    public int ShotLocation { get; set; }

    public int? TargetShipId { get; set; }

    public DateTime? ShotAt { get; set; }

    public int? GameId { get; set; }

    public virtual Game? Game { get; set; }

    public virtual GamePlayer ShooterNavigation { get; set; } = null!;

    public virtual Cell ShotLocationNavigation { get; set; } = null!;
}
