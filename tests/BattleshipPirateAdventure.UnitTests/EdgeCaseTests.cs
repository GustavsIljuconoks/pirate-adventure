using BattleshipPirateAdventure.Core;

namespace BattleshipPirateAdventure.UnitTests;

public class EdgeCaseTests
{
    [Theory]
    [InlineData("J1", typeof(ArgumentException))]
    [InlineData("J10", typeof(ArgumentException))]
    public void TestCellRightOutsideField(string location, Type exceptionType)
    {
        var gameField = new GameField(10, 10);

        var baseCell = gameField.GetLocation(location);
        var action = () => gameField.GetLocationRight(baseCell);

        Assert.Equal(baseCell, gameField.GetLocation(location));
        Assert.Throws(exceptionType, action);
    }

    [Theory]
    [InlineData("J10", typeof(ArgumentException))]
    [InlineData("A10", typeof(ArgumentException))]
    public void TestCellDownOutsideField(string location, Type exceptionType)
    {
        var gameField = new GameField(10, 10);

        var baseCell = gameField.GetLocation(location);
        var action = () => gameField.GetLocationDown(baseCell);

        Assert.Equal(baseCell, gameField.GetLocation(location));
        Assert.Throws(exceptionType, action);
    }
}
