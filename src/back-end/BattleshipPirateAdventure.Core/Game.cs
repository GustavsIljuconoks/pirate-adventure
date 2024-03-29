using System.Net.Http.Headers;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class Game
{
    public Game() { }

    public Game(Guid id, int columnSize, int rowSize)
    {
        Id = id;
        ColumnSize = columnSize;
        RowSize = rowSize;
    }

    public Guid Id { get; set; }

    public int ColumnSize { get; set; }

    public int RowSize { get; set; }

    public GamePlayer? Player1 { get; set; }

    public GamePlayer? Player2 { get; set; }

    public GameState State { get; set; } = GameState.Lobby;

    public bool HasPlayer1Joined => Player1 != null;

    public bool HasPlayer2Joined => Player2 != null;

    public PlayerType NextMove { get; set; }

    public void Start()
    {
        // can start only if both players are ready
        if (!HasPlayer1Joined
            || !HasPlayer2Joined
            || Player1?.State != PlayerState.Ready
            || Player2?.State != PlayerState.Ready)
        {
            throw new InvalidOperationException($"Invalid game state. Cannot start. Game Id: {Id}");
        }

        State = GameState.Started;
        NextMove = PlayerType.Player1;
    }

    public ShotResult Player1Move(Location shotLocation)
    {
        if (NextMove != PlayerType.Player1)
        {
            throw new InvalidOperationException("Next move is set for Player 2");
        }

        var result = Player2!.Field.Shoot(shotLocation);

        if (result.Scoring == Scoring.Hit)
        {
            var hitShip = Player2.Ships.GetById(result.TargetShipId!.Value);
            hitShip.Hit();
        }

        NextMove = PlayerType.Player2;

        return result;
    }

    public ShotResult Player2Move(Location shotLocation)
    {
        if (NextMove != PlayerType.Player2)
        {
            throw new InvalidOperationException("Next move is set for Player 1");
        }

        var result = Player1!.Field.Shoot(shotLocation);
        NextMove = PlayerType.Player1;

        return result;
    }

    public void SetPlayer1(string player)
    {
        Player1 = new GamePlayer(ColumnSize, RowSize, PlayerType.Player1) { Id = player };
    }

    public void SetPlayer2(string player)
    {
        if (HasPlayer2Joined)
        {
            throw new InvalidOperationException("Player 2 has already joined");
        }

        Player2 = new GamePlayer(ColumnSize, RowSize, PlayerType.Player2) { Id = player };
    }

    public void SetReady(PlayerType playerType)
    {
        if (playerType == PlayerType.Player1 && HasPlayer1Joined)
        {
            Player1!.SetReady();
        }

        if (playerType == PlayerType.Player2 && HasPlayer2Joined)
        {
            Player2!.SetReady();
        }

        if (HasPlayer1Joined && Player1!.State == PlayerState.Ready && HasPlayer2Joined && Player2!.State == PlayerState.Ready)
        {
            Start();
        }
    }
}
