using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GamePlayer
{
    public GamePlayer() { }

    public GamePlayer(int columnSize, int rowSize, PlayerType type)
    {
        PlayerType = type;
        Field = new GameField(columnSize, rowSize);
    }

    public string? Id { get; set; }

    public PlayerType PlayerType { get; set; }
    
    public GameField Field { get; set; }
    
    public PlayerState State { get; set; } = PlayerState.NotReady;

    public List<Ship> Ships { get; set; } = [];

    public void InitField(List<Ship> ships)
    {
        Field.Init(ships);

        foreach (var ship in ships)
        {
            Ships.Add(ship);
        }
    }

    public void SetReady()
    {
        State = PlayerState.Ready;
    }

    public void NotReady()
    {
        State = PlayerState.NotReady;
        Field.ResetAllCellStates();
        Ships = [];
    }
}

public static class ListOfShipsExtensions
{
    public static Ship GetById(this List<Ship> ships, int id)
    {
        return ships.Single(s => s.Id == id);
    }
}
