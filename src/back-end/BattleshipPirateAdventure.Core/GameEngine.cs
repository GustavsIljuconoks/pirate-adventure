namespace BattleshipPirateAdventure.Core;

public class GameEngine
{
    public Game CreateGame(int columnSize, int rowSize)
    {
        return new Game(Guid.NewGuid(), columnSize, rowSize);
    }
}
