using System.Text.RegularExpressions;

namespace BattleshipPirateAdventure.Core.Models;

public class Location
{
    private Regex _rowCheck = new Regex("[A-J]", RegexOptions.Compiled);

    public Location(string cellId)
    {
        if (cellId == null || cellId.Length < 2 || cellId.Length > 3)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        // validate row
        var row = cellId.ToCharArray()[0].ToString();
        if (!_rowCheck.IsMatch(row))
        {
            throw new ArgumentException("Invalid cell ID");
        }

        // validate column
        var column = int.Parse(new string(cellId.ToCharArray()[1..]));
        if (column < 1 || column > 10)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        Row = row;
        Column = column - 1;
        CellId = cellId;
    }

    public string Row { get; }
    public int Column { get; }
    internal string CellId { get; }
}
