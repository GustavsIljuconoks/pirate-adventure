using System.Text.Json;

namespace BattleshipPirateAdventure.Core;

public class GameEngine
{
    public Game CreateGame(int columnSize, int rowSize)
    {
        return new Game(Guid.NewGuid(), columnSize, rowSize);
    }

    public async Task SaveGameAsync(Game game)
    {
        var gameJson = JsonSerializer.Serialize(game);

        await File.WriteAllTextAsync(GetGameFileName(game), gameJson);
    }

    public async Task<Game> LoadGameAsync(Guid gameId)
    {
        var gameJson = await File.ReadAllTextAsync(GetGameFileName(gameId));

        var game = JsonSerializer.Deserialize<Game>(gameJson) ?? throw new IOException("Failed to deserialize game");

        game.Player1?.PostLoad(game);
        game.Player2?.PostLoad(game);

        return game;
    }

    private static string GetGameFileName(Game game)
    {
        return GetGameFileName(game.Id);
    }

    private static string GetGameFileName(Guid gameId)
    {
        return $"{gameId}.json";
    }
}
