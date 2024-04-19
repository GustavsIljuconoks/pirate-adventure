using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class GameWinTests
{
    [Fact]
    public void GameWinPlayer1()
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1("gustavs");
        var player1 = game.Player1!;
        player1.InitField([
            new(1, "Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            new(2, "Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical)
        ]);
        player1.SetReady();

        game.SetPlayer2("valdis");
        var player2 = game.Player2!;
        player2.InitField([
            new(1, "Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
        ]);
        player2.SetReady();

        game.Start();


        // ship "Docker" should be downed
        var targetShip = player2.Ships.GetById(1);

        // go player 1
        var result = game.Player1Shoot(game.Player2!.Field.GetLocation("A1"));

        // go player 2
        result = game.Player2Shoot(game.Player1!.Field.GetLocation("B1"));

        // go player 1 - downs all ships
        result = game.Player1Shoot(game.Player2!.Field.GetLocation("D1"));
        result = game.Player1Shoot(game.Player2!.Field.GetLocation("E1"));

        Assert.Equal(GameState.Finished, game.State);
        Assert.Equal(PlayerState.Winner, player1.State);
        Assert.Equal(PlayerState.Loser, player2.State);
    }
}
