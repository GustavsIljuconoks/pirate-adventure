using static System.String;
using BattleshipPirateAdventure.Core.Models;
using System.Text.RegularExpressions;

namespace BattleshipPirateAdventure.Core;

public class GameField
{
    private Regex _columnCheck = new Regex("[A-J]", RegexOptions.Compiled);
    private  Dictionary<int, Cell[]> _cells = new();

    public GameField(int columnSize, int rowSize)
    {
        foreach (var row in Enumerable.Range(0, rowSize))
        {
            _cells.Add(row, Columns.Select(i => new Cell()).ToArray());
        }
        ColumnSize = columnSize;
        RowSize = rowSize;
    }

    public static string[] Columns { get; } = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" };

    // TODO: Add rows indexes to be strings
    public static int[] Rows { get; } = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    public int ColumnSize { get; }
    public int RowSize { get; }

    public void Init(List<Ship> ships)
    {
        foreach (var ship in ships)
        {
            var location = ship.HeadLocation;
            var headCell = GetCell(location.CellId);
            headCell.SetState(CellState.Occupied);

            if (ship.Size > 1)
            {
                if (ship.Orientation == Orientation.Vertical)
                {
                    for (int i = 0; i < ship.Size - 1; i++)
                    {
                        var nextCell = GetLocationDown(location);
                        var shipCell = GetCell(nextCell.CellId);
                        shipCell.SetState(CellState.Occupied);
                        location = nextCell;
                    }
                }

                if (ship.Orientation == Orientation.Horizontal)
                {
                    for (int i = 0; i < ship.Size - 1; i++)
                    {
                        var nextCell = GetLocationRight(location);
                        var shipCell = GetCell(nextCell.CellId);
                        shipCell.SetState(CellState.Occupied);
                        location = nextCell;
                    }
                }
            }
        }
    }

    public Location GetLocation(string cellId)
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
        var charIndex = GetColumnIndex(column);

        // validate row
        var row = int.Parse(new string(cellId.ToCharArray()[1..]));
        if (row < 1 || row > RowSize)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        return new Location(cellId, charIndex, row - 1);
    }

    internal static int GetColumnIndex(string columnName)
    {
        return Array.IndexOf(Columns, columnName);
    }

    public Cell GetCell(string cellId)
    {
        var location = GetLocation(cellId);
        return _cells[location.Row][location.Column];
    }

    public Location? GetLocationRight(Location baseCell)
    {
        var nextColumn = baseCell.Column + 1;
        var nextRow = baseCell.Row;

        if (nextColumn >= ColumnSize)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        var newColumn = Columns[nextColumn];
        var nextCell = Concat(newColumn, nextRow + 1);
        return new Location(nextCell, nextColumn, nextRow);
    }

    public Location GetLocationDown(Location baseCell)
    {
        var nextRow = baseCell.Row + 1;

        if (nextRow >= RowSize)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        var newColumn = Columns[baseCell.Column];
        var newRow = Rows[nextRow];

        var nextCell = Concat(newColumn, newRow);
        return new Location(nextCell, baseCell.Column, nextRow);
    }
}
