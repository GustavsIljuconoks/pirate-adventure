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
        var sut = new Location(cellId);

        Assert.Equal(expectedRow, sut.Row);
        Assert.Equal(expectedColumn, sut.Column);
    }

    [Theory]
    [InlineData("X", typeof(ArgumentException))]
    [InlineData("A11", typeof(ArgumentException))]
    [InlineData("X9", typeof(ArgumentException))]
    [InlineData("Y119", typeof(ArgumentException))]
    [InlineData("AAA", typeof(FormatException))]
    public void TestInvalidLocationParsing(string location, Type exceptionType)
    {
        var action = () => new Location(location);

        Assert.Throws(exceptionType, action);
    }
}
