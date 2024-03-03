using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.Core;

public class GamePlayer
{
    private Game _game;

    public GamePlayer() { }

    public GamePlayer(int columnSize, int rowSize, PlayerType type, Game game)
    {
        PlayerType = type;
        _game = game;
        Field = new GameField(columnSize, rowSize);
    }
    public string? Id { get; set; }
    public PlayerType PlayerType { get; set; }
    public GameField Field { get; set; }

    public void InitField(List<Ship> ships)
    {
        Field.Init(ships);
    }

    internal void PostLoad(Game game)
    {
        _game = game;
    }

    public void SetReady()
    {
        _game.State = PlayerType switch
        {
            PlayerType.Player1 => GameState.Player1Ready,
            PlayerType.Player2 => GameState.Player2Ready,
            _ => _game.State
        };
    }
}
