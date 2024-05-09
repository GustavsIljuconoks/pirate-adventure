using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class Ship
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int Size { get; set; }

    public int HeadLocation { get; set; }

    public int HitCount { get; set; }

    public int OrientationId { get; set; }

    public bool? IsDestroyed { get; set; }

    public virtual Cell HeadLocationNavigation { get; set; } = null!;

    public virtual Orientation Orientation { get; set; } = null!;
}
