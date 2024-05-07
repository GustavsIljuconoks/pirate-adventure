using System;
using System.Collections.Generic;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class GamePlayer
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public short? Scoring { get; set; }

    public virtual ICollection<GameField> GameFields { get; set; } = new List<GameField>();

    public virtual ICollection<PlayerShootEvent> PlayerShootEvents { get; set; } = new List<PlayerShootEvent>();
}
