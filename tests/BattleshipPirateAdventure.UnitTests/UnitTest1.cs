using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class UnitTest1
{
    [Theory]
    [InlineData("A1", "A", 0)]
    [InlineData("B2", "B", 1)]
    [InlineData("C10", "C", 9)]
    public void TestLocationParsing(string location, string expectedRow, int expectedColumn)
    {
        var sut = new Location(location);

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

    [Fact]
    public void TestGameInit()
    {
        // unit tests has 3 states - known as triple A
        // Arrange: initializes all required state (usually creates sut - System Under Test)
        // Act: performs the action (here initializes fields and sets coordinates for the ships for each player)
        // Assert: verifies action outcomes and compare with expected results

        var engine = new GameEngine();
        var game = engine.CreateGame();

        game.Player1.InitField(new List<Ship>
        {
            new Ship("NameOfTheShip", 1, new Location("A1"), Orientation.Horizontal)
                // 3 - length of the ship
                // A1 - coordinates of the ship (head of the ship)
                // Horizontal orientation: taking space from A1 to A3
        });
        game.Player2.InitField(new List<Ship>
        {
            new Ship("NameOfTheShip2", 1, new Location("C3"), Orientation.Vertical)
            // 2 - length of the ship
            // C3 - location of the ship
            // Vertical orientation: taking space from C3 to D3
        });

        game.Start(); // initializes the game (for now does nothing)

        // verify that player1 field cell A1 is occupied - there is a ship docked there
        Assert.Equal(CellState.Occupied, game.Player1.Field.GetCell(new Location("A1")).State);
    }
}
