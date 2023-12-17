namespace BattleshipPirateAdventure.Core;

public class GameEngine
{
    public Game CreateGame()
    {
        return new Game(Guid.NewGuid());
    }
}
