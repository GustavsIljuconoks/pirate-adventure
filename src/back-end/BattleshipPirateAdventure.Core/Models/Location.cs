namespace BattleshipPirateAdventure.Core.Models;

public class Location(string cellId, int column, int row) : IEquatable<Location>
{
    public int Row { get; set; } = row;
    public int Column { get; set; } = column;
    internal string CellId { get; } = cellId;

    public bool Equals(Location? other)
    {
        return Row == other.Row && Column == other.Column && CellId == other.CellId;
    }
}
