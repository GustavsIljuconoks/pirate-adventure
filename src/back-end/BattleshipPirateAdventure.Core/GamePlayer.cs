using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GamePlayer
{
    public GamePlayer()
    {
        Field = new GameField();
    }

    public GameField Field { get; }

    public void InitField(List<Ship> ships)
    {
        Field.Init(ships);
    }
}
