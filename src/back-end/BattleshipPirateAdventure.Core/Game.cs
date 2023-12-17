namespace BattleshipPirateAdventure.Core;

public class Game
{
    private Guid _id;

    public Game(Guid id)
    {
        _id = id;
        Player1 = new GamePlayer();
        Player2 = new GamePlayer();
    }

    public Guid Id => _id;

    public GamePlayer Player1 { get; }

    public GamePlayer Player2 { get; }

    public void Start()
    {
    }
}
