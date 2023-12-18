using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GameField
{
    private Dictionary<int, Cell[]> _cells = new();

    public GameField()
    {
        foreach (var row in Enumerable.Range(0, 10))
        {
            _cells.Add(row, Location.Columns.Select(i => new Cell()).ToArray());
        }
    }

    public void Init(List<Ship> ships)
    {
        foreach (var ship in ships)
        {
            // TODO: Add ship orientation validation
            var location = ship.HeadLocation;
            var headCell = GetCell(location);

            headCell.SetState(CellState.Occupied);
        }
    }

    public Cell GetCell(Location location)
    {
        return _cells[location.Row][location.Column];
    }
}
