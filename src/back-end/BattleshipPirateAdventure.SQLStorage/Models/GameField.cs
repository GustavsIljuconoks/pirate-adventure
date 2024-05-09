using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class GameField
{
    public int Id { get; set; }

    public int RowSize { get; set; }

    public int ColumnSize { get; set; }

    public int PlayerId { get; set; }

    public int GameId { get; set; }

    public virtual ICollection<Cell> Cells { get; set; } = new List<Cell>();

    public virtual Game Game { get; set; } = null!;

    public virtual GamePlayer Player { get; set; } = null!;
}
