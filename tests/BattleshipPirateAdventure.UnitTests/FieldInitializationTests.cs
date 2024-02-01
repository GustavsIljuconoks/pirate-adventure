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
            new Ship("Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical),
            new Ship("Mother", 5, player1.Field.GetLocation("F7"), Orientation.Horizontal)
                // 3 - length of the ship
                // A1 - coordinates of the ship (head of the ship)
                // Horizontal orientation: taking space from A1 to C3
        });

        var player2 = game.Player2;
        player2.InitField(new List<Ship>
        {
            new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            new Ship("Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
            new Ship("Mother", 5, player2.Field.GetLocation("I4"), Orientation.Vertical)
            // 2 - length of the ship
            // C3 - location of the ship
            // Vertical orientation: taking space from C3 to C4
        });

        game.Start(); // initializes the game (for now does nothing)

        Assert.Equal(CellState.Occupied, player1.Field.GetCell("A1").State);
        Assert.Equal(CellState.Occupied, player1.Field.GetCell("B2").State);
        Assert.Equal(CellState.Occupied, player1.Field.GetCell("B3").State);
        Assert.Equal(CellState.Occupied, player1.Field.GetCell("B4").State);
        Assert.Equal(CellState.Occupied, player1.Field.GetCell("F7").State);
        Assert.Equal(CellState.Occupied, player1.Field.GetCell("J7").State);

        Assert.Equal(CellState.Occupied, player2.Field.GetCell("C3").State);
        Assert.Equal(CellState.Occupied, player2.Field.GetCell("D1").State);
        Assert.Equal(CellState.Occupied, player2.Field.GetCell("E1").State);
        Assert.Equal(CellState.Occupied, player2.Field.GetCell("I4").State);
        Assert.Equal(CellState.Occupied, player2.Field.GetCell("I8").State);
    }
}
