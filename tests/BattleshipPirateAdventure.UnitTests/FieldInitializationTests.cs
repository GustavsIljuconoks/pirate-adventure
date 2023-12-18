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
        var game = engine.CreateGame();

        var player1 = game.Player1;
        player1.InitField(new List<Ship>
        {
            new Ship("Skipper", 1, new Location("A1"), Orientation.Horizontal),
            //new Ship("Docker", 2, new Location("B2"), Orientation.Horizontal)
                // 3 - length of the ship
                // A1 - coordinates of the ship (head of the ship)
                // Horizontal orientation: taking space from A1 to C3
        });

        var player2 = game.Player2;
        game.Player2.InitField(new List<Ship>
        {
            new Ship("Skipper", 1, new Location("C3"), Orientation.Vertical),
            //new Ship("Docker", 2, new Location("D1"), Orientation.Horizontal)
            // 2 - length of the ship
            // C3 - location of the ship
            // Vertical orientation: taking space from C3 to C4
        });

        game.Start(); // initializes the game (for now does nothing)

        // verify that player1 field cell A1 is occupied - there is a ship docked there
        Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("A1")).State);

        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("B2")).State);
        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("B3")).State);

        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("C3")).State);
        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("D1")).State);
        //Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("E1")).State);
    }
}
