using System.Collections.Concurrent;
using Azure;
using Azure.Data.Tables;
using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using BattleshipPirateAdventure.WebApi.Features.Game.Models;
using BattleshipPirateAdventure.WebApi.Features.Root.Models;
using Microsoft.AspNetCore.Identity;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.Azure;

public interface ITableStorageService
{
    Task<IEnumerable<LeaderboardResponseDto>> GetLeaderboard();
    Task<IEnumerable<PlayerGamesResponseDto>> GetPlayerGames(string playerName, IBlobStorageService blobStorageService);
    Task<UserItemEntity> GetUserByName(string username);
    Task<UserItemEntity> RegisterUser(string username, string password, string email);
    Task AddGameAsync(Game game);
    Task UpdateGameAsync(Game game, GamePlayer winner);
    Task CreateTables();
}

public class TableStorageService(string connectionString, ILogger<TableStorageService> logger) : ITableStorageService
{
    private const string UsersTableName = "users";
    private const string GamesTableName = "games";

    private readonly TableClient _usersTable = new(connectionString, UsersTableName);
    private readonly TableClient _gamesTable = new(connectionString, GamesTableName);

    public async Task<IEnumerable<LeaderboardResponseDto>> GetLeaderboard()
    {
        return _usersTable.Query<UserItemEntity>()
            .OrderByDescending(entity => entity.Cups)
            .Select(entity => new LeaderboardResponseDto
            {
                name = entity.RowKey,
                cups = entity.Cups
            })
            .Take(10)
            .ToList();
    }

    public async Task<UserItemEntity> GetUserByName(string username)
    {
        try
        {
            logger.LogInformation($"Getting user by login name '{username}' using '{_usersTable.AccountName}' storage");
            var query = _usersTable.Query<UserItemEntity>().Where(e => e.RowKey == username);
            var user = query.First();
            return user;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while getting user by name: {ex.Message}");
            logger.LogError(ex, $"Failed to retrieve user by name '{username}'");
            return null;
        }
    }

    public async Task<UserItemEntity> RegisterUser(string username, string password, string email)
    {
        // Validate the input
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(email))
        {
            throw new ArgumentException("Username and password are required.");
        }

        // Check if a user with the same username already exists
        var existingUser = await GetUserByName(username);
        if (existingUser != null)
        {
            throw new ArgumentException("A user with this username already exists.");
        }

        var passwordHasher = new PasswordHasher<UserItemEntity>();
        var passwordHash = passwordHasher.HashPassword(null, password);

        // Create a new user
        var user = new UserItemEntity
        {
            PartitionKey = "users",
            RowKey = username,
            Password = passwordHash,
            Email = email
        };

        // Save the user to the database
        await _usersTable.AddEntityAsync(user);

        return user;
    }

    public async Task AddGameAsync(Game game)
    {
        var gameEntity = new TableEntity(game.Player1.Id.ToString(), game.Id.ToString())
        {
            { "player1", game.Player1.Id },
            { "player2", game.Player2?.Id }
        };

        try
        {
            var existingGameEntity = await _gamesTable.GetEntityAsync<TableEntity>(game.Player1.Id.ToString(), game.Id.ToString());

            if (existingGameEntity.Value != null && game.Player2 != null)
            {
                existingGameEntity.Value["player2"] = game.Player2.Id;
                await _gamesTable.UpdateEntityAsync(existingGameEntity.Value, ETag.All);
            }
        }
        catch (RequestFailedException ex) when (ex.Status == 404)
        {
            await _gamesTable.AddEntityAsync(gameEntity);
        }

        if (game.State == GameState.Finished)
        {
            await UpdateGameAsync(game, game.Player1.State == PlayerState.Winner ? game.Player1 : game.Player2);
        }
    }

    public async Task UpdateGameAsync(Game game, GamePlayer winner)
    {
        try
        {
            var existingGameEntity = await _gamesTable.GetEntityAsync<TableEntity>(game.Player1.Id.ToString(), game.Id.ToString());
            var query = _usersTable.Query<UserItemEntity>().Where(e => e.RowKey == winner.Id.ToString());
            var userEntity = query.First();


            if (existingGameEntity.Value != null)
            {
                existingGameEntity.Value["winner"] = winner.Id;
                await _gamesTable.UpdateEntityAsync(existingGameEntity.Value, ETag.All);
            }

            if (userEntity != null)
            {
                userEntity.Wins += 1;
                userEntity.Cups += 2;
                await _usersTable.UpdateEntityAsync(userEntity, ETag.All);
            }
        }
        catch (RequestFailedException ex) when (ex.Status == 404)
        {
            Console.WriteLine($"Game with ID {game.Id} not found");
        }
    }

    public async Task CreateTables()
    {
        await _usersTable.CreateIfNotExistsAsync();
        await _gamesTable.CreateIfNotExistsAsync();
    }

    public async Task<IEnumerable<PlayerGamesResponseDto>> GetPlayerGames(string playerName, IBlobStorageService blobStorageService)
    {
        var games = _gamesTable.Query<GameItemEntity>()
            .OrderByDescending(entity => entity.Timestamp)
            .Where(g => g.player1 == playerName || g.player2 == playerName)
            .ToList();

        var playerGames = new List<PlayerGamesResponseDto>();

        foreach (var gameEntity in games)
        {
            var test = Guid.Parse(gameEntity.RowKey);
            var game = await blobStorageService.LoadGameAsync(Guid.Parse(gameEntity.RowKey));

            if (game.State == GameState.Finished)
            {
                playerGames.Add(new PlayerGamesResponseDto
                {
                    gameId = Guid.Parse(gameEntity.RowKey),
                    status = gameEntity.winner == playerName ? Status.Winner : Status.Loser,
                    player1 = gameEntity.player1,
                    player2 = gameEntity.player2,
                    date = gameEntity.Timestamp.Value.DateTime
                });
            }
            else
            {
                playerGames.Add(new PlayerGamesResponseDto
                {
                    gameId = Guid.Parse(gameEntity.RowKey),
                    status = Status.Ongoing,
                    player1 = gameEntity.player1,
                    player2 = gameEntity.player2,
                    date = gameEntity.Timestamp.Value.DateTime
                });
            }
        }

        return playerGames;
    }
}
