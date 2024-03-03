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

    public int ColumnSize { get; set;  }

    public int RowSize { get; set; }

    public GamePlayer? Player1 { get; set; }

    public GamePlayer? Player2 { get; set; }

    public GameState State { get; set; } = GameState.Lobby;

    public void Start() { }

    public void SetPlayer1(string player)
    {
        Player1 = new GamePlayer(ColumnSize, RowSize, PlayerType.Player1, this) { Id = player };
    }

    public void SetPlayer2(string player)
    {
        Player2 = new GamePlayer(ColumnSize, RowSize, PlayerType.Player2, this) { Id = player };
    }

    public bool HasPlayer1Joined => Player1 != null;

    public bool HasPlayer2Joined => Player2 != null;
}
