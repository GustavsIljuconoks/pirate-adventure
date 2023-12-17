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
        foreach (var ship in ships)
        {
            var location = ship.HeadLocation;
            var headCell = Field.GetCell(location);

            headCell.SetState(CellState.Occupied);

            //if (ship.Orientation == Orientation.Horizontal)
            //{

            //}
        }
    }
}
