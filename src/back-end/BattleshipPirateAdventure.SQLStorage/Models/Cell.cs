using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class Cell
{
    public int Id { get; set; }

    public int? ShipId { get; set; }

    public int CellStateId { get; set; }

    public int GameFieldId { get; set; }

    public virtual CellState CellState { get; set; } = null!;

    public virtual GameField GameField { get; set; } = null!;

    public virtual ICollection<PlayerShootEvent> PlayerShootEvents { get; set; } = new List<PlayerShootEvent>();

    public virtual ICollection<Ship> Ships { get; set; } = new List<Ship>();
}
