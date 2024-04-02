using System.Text.RegularExpressions;
using BattleshipPirateAdventure.Core.Models;
using static System.String;

namespace BattleshipPirateAdventure.Core;

public class GameField
{
    private readonly Regex _columnCheck = new("[A-J]", RegexOptions.Compiled);

    public GameField() : this(10, 10) { }

    public GameField(int columnSize, int rowSize)
    {
        foreach (var row in Enumerable.Range(0, rowSize))
        {
            Cells.Add(row, Columns.Select(_ => new Cell()).ToArray());
        }

        ColumnSize = columnSize;
        RowSize = rowSize;
    }

    public Dictionary<int, Cell[]> Cells { get; set; } = new();

    public static string[] Columns { get; } = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    // TODO: Add rows indexes to be strings
    public static int[] Rows { get; } = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    public int ColumnSize { get; set; }

    public int RowSize { get; set; }

    public void Init(List<Ship> ships)
    {
        foreach (var ship in ships)
        {
            var location = ship.HeadLocation;
            var headCell = GetCell(location.CellId);
            headCell.SetState(CellState.Occupied, ship.Id);

            if (ship.Size > 1)
            {
                if (ship.Orientation == Orientation.Vertical)
                {
                    for (var i = 0; i < ship.Size - 1; i++)
                    {
                        var nextCell = GetLocationDown(location);
                        var shipCell = GetCell(nextCell.CellId);
                        shipCell.SetState(CellState.Occupied, ship.Id);
                        location = nextCell;
                    }
                }

                if (ship.Orientation == Orientation.Horizontal)
                {
                    for (var i = 0; i < ship.Size - 1; i++)
                    {
                        var nextCell = GetLocationRight(location);
                        var shipCell = GetCell(nextCell.CellId);
                        shipCell.SetState(CellState.Occupied, ship.Id);
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
        var column = cellId[0].ToString();
        if (!_columnCheck.IsMatch(column))
        {
            throw new ArgumentException("Invalid cell ID");
        }

        var charIndex = GetColumnIndex(column);

        // validate row
        var row = int.Parse(new string(cellId[1..]));
        if (row < 1 || row > RowSize)
        {
            throw new ArgumentException("Invalid cell ID");
        }

        return new Location(cellId, charIndex, row - 1);
    }

    public Location GetLocation(int row, int column)
    {
        return new Location(Columns[column] + Rows[row], column, row);
    }

    internal static int GetColumnIndex(string columnName)
    {
        return Array.IndexOf(Columns, columnName);
    }

    public Cell GetCell(string cellId)
    {
        var location = GetLocation(cellId);
        return Cells[location.Row][location.Column];
    }

    public Location GetLocationRight(Location baseCell)
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

    public ShotResult Shoot(Location shotLocation)
    {
        var target = GetCell(shotLocation.CellId);

        if (target.State == CellState.Occupied)
        {
            var score = new ShotResult(shotLocation, target.ShipId, Scoring.Hit);
            target.State = CellState.Hit;

            return score;
        }

        if (target.State == CellState.Free || target.State == CellState.None)
        {
            var score = new ShotResult(shotLocation, null, Scoring.Missed);
            target.State = CellState.Missed;

            return score;
        }

        if (target.State == CellState.Hit || target.State == CellState.Missed)
        {
            throw new ArgumentOutOfRangeException(nameof(shotLocation), "This cell has already been targeted");
        }

        throw new ArgumentOutOfRangeException(nameof(shotLocation), "Invalid cell id");
    }
}
