namespace BattleshipPirateAdventure.Core.Models;

public class Location : IEquatable<Location>
{
    public Location() { }

    public Location(string cellId, int column, int row)
    {
        Row = row;
        Column = column;
        CellId = cellId;
    }

    public int Row { get; set; }
    public int Column { get; set; }
    public string CellId { get; }

    public bool Equals(Location? other)
    {
        return Row == other.Row && Column == other.Column && CellId == other.CellId;
    }
}
