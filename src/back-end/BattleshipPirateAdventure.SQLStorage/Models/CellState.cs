using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class CellState
{
    public int Id { get; set; }

    public string State { get; set; } = null!;

    public virtual ICollection<Cell> Cells { get; set; } = new List<Cell>();
}
