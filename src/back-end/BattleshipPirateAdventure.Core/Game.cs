namespace BattleshipPirateAdventure.Core;

public class Game
{
    private Guid _id;

    public Game(Guid id, int columnSize, int rowSize)
    {
        _id = id;
        Player1 = new GamePlayer(columnSize, rowSize);
        Player2 = new GamePlayer(columnSize, rowSize);
    }

    public Guid Id => _id;

    public GamePlayer Player1 { get; }

    public GamePlayer Player2 { get; }

    public void Start()
    {
    }
}
