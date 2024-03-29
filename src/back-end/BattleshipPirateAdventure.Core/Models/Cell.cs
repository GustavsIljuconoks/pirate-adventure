namespace BattleshipPirateAdventure.Core.Models;

public class Cell
{
    public int? ShipId { get; set; }

    public CellState State { get; set; }

    internal void SetState(CellState newState, int shipId)
    {
        ShipId = shipId;
        State = newState;
    }
}
