using Azure.Storage.Blobs;
using BattleshipPirateAdventure.Core;
using Newtonsoft.Json;
using System.Text;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.Azure;


public interface IBlobStorageService
{
    Task SaveGameAsync(Game game);
    Task<Game> LoadGameAsync(Guid gameId);
    Task CreateBlobContainer();
}

public class BlobStorageService : IBlobStorageService
{
    private readonly IConfiguration _config;
    private readonly BlobServiceClient _blobServiceClient;
    private readonly ITableStorageService _storageService;
    private readonly string _blobContainer = "games";
    private readonly BlobContainerClient _blobContainerClient;

    public BlobStorageService(BlobServiceClient blobServiceClient, IConfiguration configuration, ITableStorageService storageService)
    {
        _config = configuration;
        _blobServiceClient = blobServiceClient;
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(_blobContainer);
    }

    public async Task SaveGameAsync(Game game)
    {
        var blobClient = _blobContainerClient.GetBlobClient($"{game.Id}.json");

        var gameJson = JsonConvert.SerializeObject(game);

        using (var gameStream = new MemoryStream(Encoding.UTF8.GetBytes(gameJson)))
        {
            await blobClient.UploadAsync(gameStream, overwrite: true);
        }

        await _storageService.AddGameAsync(game);
    }

    public async Task<Game> LoadGameAsync(Guid gameId)
    {
        var gameJson = await GetBlobAsync(gameId);

        var game = JsonConvert.DeserializeObject<Game>(gameJson) ?? throw new IOException("Failed to deserialize game");

        return game;
    }

    public async Task CreateBlobContainer()
    {
        await _blobContainerClient.CreateIfNotExistsAsync();
    }

    private async Task<string> GetBlobAsync(Guid gameId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_blobContainer);
        var blobClient = blobContainerClient.GetBlobClient($"{gameId}.json");

        if (await blobClient.ExistsAsync())
        {
            var response = await blobClient.DownloadContentAsync();
            return response.Value.Content.ToString();
        }
        else
        {
            throw new Exception($"Blob with game ID {gameId} does not exist.");
        }
    }

}
