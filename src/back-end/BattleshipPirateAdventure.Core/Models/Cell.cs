namespace BattleshipPirateAdventure.Core.Models;

public class Cell
{
    public CellState State { get; set; }

    internal void SetState(CellState newState)
    {
        State = newState;
    }
}
