using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class LocationTests
{
    [Theory]
    [InlineData("A1", 0, 0)]
    [InlineData("B2", 1, 1)]
    [InlineData("C10", 9, 2)]
    public void TestLocationParsing(string cellId, int expectedRow, int expectedColumn)
    {
        var sut = new GameField(10, 10);
        var location = sut.GetLocation(cellId);

        Assert.Equal(expectedRow, location.Row);
        Assert.Equal(expectedColumn, location.Column);
    }

    [Theory]
    [InlineData(0, 0, "A1")]
    [InlineData(1, 1, "B2")]
    [InlineData(9, 2, "C10")]
    public void GetLocation_ByRowAndColumn(int row, int column, string expectedCellId)
    {
        var sut = new GameField(10, 10);
        var location = sut.GetLocation(row, column);

        Assert.Equal(expectedCellId, location.CellId);
    }

    [Theory]
    [InlineData("X", typeof(ArgumentException))]
    [InlineData("A11", typeof(ArgumentException))]
    [InlineData("X9", typeof(ArgumentException))]
    [InlineData("Y119", typeof(ArgumentException))]
    [InlineData("AAA", typeof(FormatException))]
    public void TestInvalidLocationParsing(string location, Type exceptionType)
    {
        var sut = new GameField(10, 10);
        var action = () => sut.GetLocation(location);

        Assert.Throws(exceptionType, action);
    }
}
