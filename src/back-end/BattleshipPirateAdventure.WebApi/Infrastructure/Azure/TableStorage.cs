using Azure;
using Azure.Data.Tables;
using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.Azure;

public interface ITableStorageService
{
    Task<IEnumerable<UserItemEntity>> GetAllUsers();
    Task<UserItemEntity> GetUserByName(string username);
    Task AddGameAsync(Game game);
}

public class TableStorageService : ITableStorageService
{
    private const string UsersTableName = "users";
    private const string GamesTableName = "games";
    private readonly TableClient _usersTable;
    private readonly TableClient _gamesTable;

    public TableStorageService(string connectionString)
    {
        _usersTable = new TableClient(connectionString, UsersTableName);
        _gamesTable = new TableClient(connectionString, GamesTableName);
    }

    public async Task<IEnumerable<UserItemEntity>> GetAllUsers()
    {
        var entities = new List<UserItemEntity>();
        await foreach (var entity in _usersTable.QueryAsync<UserItemEntity>())
        {
            entities.Add(entity);
        }
        return entities;
    }

    public async Task<UserItemEntity> GetUserByName(string username)
    {
        try
        {
            var query = _usersTable.Query<UserItemEntity>().Where(e => e.RowKey == username);
            var user = query.First();
            return user;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while getting user by name: {ex.Message}");
            return null;
        }
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
    }
}

