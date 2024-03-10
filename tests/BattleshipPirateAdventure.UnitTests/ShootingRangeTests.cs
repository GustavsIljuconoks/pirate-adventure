using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class ShootingRangeTests
{
    [Fact]
    public void TestGameInit()
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1("gustavs");
        var player1 = game.Player1!;

        player1.InitField([
            new Ship("Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            //new Ship("Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical),
            //new Ship("Mother", 5, player1.Field.GetLocation("F7"), Orientation.Horizontal)
        ]);
        player1.SetReady();

        game.SetPlayer2("valdis");
        var player2 = game.Player2;
        player2!.InitField([
            //new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            new Ship("Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
            //new Ship("Mother", 5, player2.Field.GetLocation("I4"), Orientation.Vertical)
        ]);
        player2.SetReady();

        game.Start(); // initializes the game (for now does nothing)

        // go player 1
        var result = game.Player1Move(game.Player2!.Field.GetLocation("A1"));

        // go player 2
        result = game.Player2Move(game.Player1!.Field.GetLocation("B1"));

        // go player 1 - 1st hit
        result = game.Player1Move(game.Player2!.Field.GetLocation("D1"));
        Assert.Equal(Scoring.Hit, result.Scoring);

        // go player 2
        result = game.Player2Move(game.Player1!.Field.GetLocation("B2"));

        // go player 1 - 2nd hit
        result = game.Player1Move(game.Player2!.Field.GetLocation("E1"));
        Assert.Equal(Scoring.Hit, result.Scoring);

        // TODO: verify that ship "Docker" has downed

        // go player 2
        result = game.Player2Move(game.Player1!.Field.GetLocation("B3"));
    }
}
