using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GameField
{
    private Dictionary<string, Cell[]> _cells = new();

    public GameField()
    {
        foreach (var row in new[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" })
        {
            _cells.Add(row, Enumerable.Range(0, 10).Select(i => new Cell()).ToArray());
        }
    }

    public Cell GetCell(Location location)
    {
        return _cells[location.Row][location.Column];
    }
}
