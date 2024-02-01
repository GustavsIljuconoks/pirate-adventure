using BattleshipPirateAdventure.Core;

namespace BattleshipPirateAdventure.UnitTests;

public class GetSiblingCellTests
{
    [Fact]
    public void TestSiblingRight()
    {
        var gameField = new GameField(10, 10);

        var baseCell = gameField.GetLocation("C3");
        var cellRight = gameField.GetLocationRight(baseCell);

        var expectedResult = gameField.GetLocation("D3");

        Assert.Equal(cellRight, expectedResult);
        Assert.Equal(baseCell, gameField.GetLocation("C3"));
    }

    [Fact]
    public void TestSiblingDown()
    {
        var gameField = new GameField(10, 10);

        var baseCell= gameField.GetLocation("B2");
        var cellDown = gameField.GetLocationDown(baseCell);

        var expectedResult = gameField.GetLocation("B3");

        Assert.Equal(cellDown, expectedResult);
        Assert.Equal(baseCell, gameField.GetLocation("B2"));
    }
}
