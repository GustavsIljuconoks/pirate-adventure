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

    public void Start() { }

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
            State = GameState.Started;
        }
    }
}
