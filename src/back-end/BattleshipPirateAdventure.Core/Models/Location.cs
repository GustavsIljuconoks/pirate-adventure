using System.Text.RegularExpressions;

namespace BattleshipPirateAdventure.Core.Models;

public class Location
{
    private Regex _columnCheck = new Regex("[A-J]", RegexOptions.Compiled);

    public Location(string cellId)
    {
        if (cellId == null || cellId.Length < 2 || cellId.Length > 3)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        // validate column
        var column = cellId.ToCharArray()[0].ToString();
        if (!_columnCheck.IsMatch(column))
        {
            throw new ArgumentException("Invalid cell ID");
        }
        var charIndex = Array.IndexOf(Columns, column);

        // validate row
        var row = int.Parse(new string(cellId.ToCharArray()[1..]));
        if (row < 1 || row > 10)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        Row = row -1;
        Column = charIndex;
        CellId = cellId;
    }

    public int  Row { get; }
    public int Column { get; set; }
    internal string CellId { get; }
    public static string[] Columns { get; } = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" };

    // TODO: Create logic to add occupancy to cells
    // based on ship orientation

}
