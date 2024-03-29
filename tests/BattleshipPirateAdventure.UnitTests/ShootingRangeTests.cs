using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.UnitTests;

public class ShootingRangeTests
{
    [Fact]
    public void TestShooting()
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1("gustavs");
        var player1 = game.Player1!;
        player1.InitField([
            new(1, "Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            new(2, "Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical),
            //new Ship("Mother", 5, player1.Field.GetLocation("F7"), Orientation.Horizontal)
        ]);
        player1.SetReady();

        game.SetPlayer2("valdis");
        var player2 = game.Player2!;
        player2.InitField([
            //new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            new(1, "Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
            //new Ship("Mother", 5, player2.Field.GetLocation("I4"), Orientation.Vertical)
        ]);
        player2.SetReady();

        game.Start();

        // ship "Docker" should be downed
        var targetShip = player2.Ships.GetById(1);

        // go player 1
        var result = game.Player1Shoot(game.Player2!.Field.GetLocation("A1"));

        // go player 2
        result = game.Player2Shoot(game.Player1!.Field.GetLocation("B1"));

        // go player 1 - 1st hit
        result = game.Player1Shoot(game.Player2!.Field.GetLocation("D1"));
        Assert.Equal(Scoring.Hit, result.Scoring);

        Assert.True(targetShip.IsHit());

        // go player 2
        var result2 = game.Player2Shoot(game.Player1!.Field.GetLocation("B2"));
        Assert.Equal(Scoring.Hit, result2.Scoring);
        var ship = game.Player1.Ships.GetById(2);
        Assert.True(ship.IsHit());

        // go player 1 - 2nd hit
        result = game.Player1Shoot(game.Player2!.Field.GetLocation("E1"));
        Assert.Equal(Scoring.Hit, result.Scoring);

        Assert.True(targetShip.IsDowned());
    }

    [Fact]
    public void Player2MakesFirstMove_ShouldReject()
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1("gustavs");
        var player1 = game.Player1!;
        player1.InitField([
            new(1, "Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            //new Ship("Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical),
            //new Ship("Mother", 5, player1.Field.GetLocation("F7"), Orientation.Horizontal)
        ]);
        player1.SetReady();

        game.SetPlayer2("valdis");
        var player2 = game.Player2!;
        player2.InitField([
            //new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            new(1, "Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
            //new Ship("Mother", 5, player2.Field.GetLocation("I4"), Orientation.Vertical)
        ]);
        player2.SetReady();

        game.Start();

        // go player 2 - SHOULD THROW
        Assert.Throws<InvalidOperationException>(() =>
        {
            game.Player2Shoot(game.Player1!.Field.GetLocation("A1"));
        });
    }

    [Fact]
    public void Player1Shoots2SubsequentShots_ShouldRejectSecond()
    {
        var engine = new GameEngine();
        var game = engine.CreateGame(10, 10);

        game.SetPlayer1("gustavs");
        var player1 = game.Player1!;
        player1.InitField([
            new(1, "Skipper", 1, player1.Field.GetLocation("A1"), Orientation.Horizontal),
            //new Ship("Docker", 3, player1.Field.GetLocation("B2"), Orientation.Vertical),
            //new Ship("Mother", 5, player1.Field.GetLocation("F7"), Orientation.Horizontal)
        ]);
        player1.SetReady();

        game.SetPlayer2("valdis");
        var player2 = game.Player2!;
        player2.InitField([
            //new Ship("Skipper", 1, player2.Field.GetLocation("C3"), Orientation.Vertical),
            new(1, "Docker", 2, player2.Field.GetLocation("D1"), Orientation.Horizontal),
            //new Ship("Mother", 5, player2.Field.GetLocation("I4"), Orientation.Vertical)
        ]);
        player2.SetReady();

        game.Start();

        game.Player1Shoot(game.Player1!.Field.GetLocation("A1"));

        // go player 2 - SHOULD THROW
        Assert.Throws<InvalidOperationException>(() =>
        {
            game.Player1Shoot(game.Player1!.Field.GetLocation("A2"));
        });
    }

    [Fact]
    public void ShipHitStateTest()
    {
        var ship = new Ship(1, "Docker", 5, new Location("A1", 0, 0), Orientation.Horizontal);

        ship.Hit();

        Assert.True(ship.IsHit());

        ship.Hit();
        ship.Hit();
        ship.Hit();
        ship.Hit();

        Assert.True(ship.IsDowned());
    }
}
