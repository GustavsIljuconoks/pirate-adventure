using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class Game
{
    public int Id { get; set; }

    public Guid Guid { get; set; }

    public int ColumnSize { get; set; }

    public int RowSize { get; set; }

    public int? Player1 { get; set; }

    public int? Player2 { get; set; }

    public int NextMove { get; set; }

    public DateTime CreationDate { get; set; }

    public int? WinnerId { get; set; }

    public DateTime? GameFinished { get; set; }

    public int GameStateId { get; set; }

    public virtual ICollection<GameField> GameFields { get; set; } = new List<GameField>();

    public virtual GameState GameState { get; set; } = null!;

    public virtual ICollection<PlayerShootEvent> PlayerShootEvents { get; set; } = new List<PlayerShootEvent>();
}
