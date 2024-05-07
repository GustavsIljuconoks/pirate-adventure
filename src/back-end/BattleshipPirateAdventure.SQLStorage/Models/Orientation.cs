using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class Orientation
{
    public int Id { get; set; }

    public string Orientation1 { get; set; } = null!;

    public virtual ICollection<Ship> Ships { get; set; } = new List<Ship>();
}
