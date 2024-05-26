using Azure.Storage.Blobs;
using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.Azure;


public interface IBlobStorageService
{
    Task SaveGameAsync(Game game);
    Task<Game> LoadGameAsync(Guid gameId);
}

public class BlobStorageService : IBlobStorageService
{
    private readonly IConfiguration _config;
    private readonly BlobServiceClient _blobServiceClient;
    private readonly ITableStorageService _storageService;
    private readonly string _blobContainer = "games";

    public BlobStorageService(BlobServiceClient blobServiceClient, IConfiguration configuration, ITableStorageService storageService)
    {
        _config = configuration;
        _blobServiceClient = blobServiceClient;
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));
    }

    public async Task SaveGameAsync(Game game)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_blobContainer);
        var blobClient = blobContainerClient.GetBlobClient($"{game.Id}.json");

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

    private async Task<string> GetBlobAsync(Guid gameId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_blobContainer);
        var blobClient = blobContainerClient.GetBlobClient($"{gameId}.json");
        var response = await blobClient.DownloadContentAsync();
        return response.Value.Content.ToString();
    }
}
