using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GamePlayer
{
    public GamePlayer() { }

    public GamePlayer(int columnSize, int rowSize)
    {
        Field = new GameField(columnSize, rowSize);
    }

    public GameField Field { get; set; }

    public string? Id { get; set; }

    public void InitField(List<Ship> ships)
    {
        Field.Init(ships);
    }
}
