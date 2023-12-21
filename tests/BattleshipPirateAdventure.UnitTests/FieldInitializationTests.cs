using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class FieldInitializationTests
{
    [Fact]
    public void TestGameInit()
    {
        // unit tests has 3 states - known as triple A
        // Arrange: initializes all required state (usually creates sut - System Under Test)
        // Act: performs the action (here initializes fields and sets coordinates for the ships for each player)
        // Assert: verifies action outcomes and compare with expected results

        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        var player1 = game.Player1;
        player1.InitField(new List<Ship>
        {
            new Ship("Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            new Ship("Docker", 2, player1.Field.GetLocation("B2"), Orientation.Vertical)
                // 3 - length of the ship
                // A1 - coordinates of the ship (head of the ship)
                // Horizontal orientation: taking space from A1 to C3
        });

        var player2 = game.Player2;
        player2.InitField(new List<Ship>
        {
            new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            //new Ship("Docker", 2, new Location("D1"), Orientation.Horizontal)
            // 2 - length of the ship
            // C3 - location of the ship
            // Vertical orientation: taking space from C3 to C4
        });

        game.Start(); // initializes the game (for now does nothing)

        // verify that player1 field cell A1 is occupied - there is a ship docked there
        Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell("A1").State);

        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("B2")).State);
        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("B3")).State);

        Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell("C3").State);
        Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell("D1").State);
        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("E1")).State);
    }
}

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
