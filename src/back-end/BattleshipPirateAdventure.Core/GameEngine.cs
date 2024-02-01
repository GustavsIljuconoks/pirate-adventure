using System.Text.Json;
using System.Text.Json.Serialization;

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

        return JsonSerializer.Deserialize<Game>(gameJson) ?? throw new IOException("Failed to deserialize game");
    }

    private static string GetGameFileName(Game game) => GetGameFileName(game.Id);

    private static string GetGameFileName(Guid gameId) => $"{gameId}.json";
}
