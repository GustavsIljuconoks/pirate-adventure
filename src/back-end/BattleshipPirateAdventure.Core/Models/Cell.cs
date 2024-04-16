using System.Diagnostics;

namespace BattleshipPirateAdventure.Core.Models;

[DebuggerDisplay("{" + nameof(DebuggerDisplay) + ",nq}")]
public class Cell
{
    public int? ShipId { get; set; }

    public CellState State { get; set; }

    internal void SetState(CellState newState, int shipId)
    {
        ShipId = shipId;
        State = newState;
    }

    private string DebuggerDisplay => $"State: {State} / Ship Id: {ShipId}";
}
