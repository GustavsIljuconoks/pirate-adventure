using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.WindowsAzure.Storage.Table;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.Azure;

public interface ITableStorageService
{
    Task<IEnumerable<UserItemEntity>> GetAllUsers();
    Task<UserItemEntity> GetUserByName(string username);
}


public class TableStorageService : ITableStorageService
{
    private const string TableName = "users";
    private readonly IConfiguration _configuration;
    private readonly CloudTable _table;

    public TableStorageService(IConfiguration configuration, CloudTableClient tableClient)
    {
        _configuration = configuration;
        _table = tableClient.GetTableReference(TableName);
    }

    public async Task<IEnumerable<UserItemEntity>> GetAllUsers()
    {
        var entities = new List<UserItemEntity>();
        TableContinuationToken token = null;
        do
        {
            var query = new TableQuery<UserItemEntity>();
            var resultSegment = await _table.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;
            entities.AddRange(resultSegment.Results);
        } while (token != null);
        return entities;
    }

    public async Task<UserItemEntity> GetUserByName(string username)
    {
        // Create a TableQuery to retrieve the user by username
        var query = new TableQuery<UserItemEntity>()
            .Where(TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, username));

        try
        {
            var queryResult = await _table.ExecuteQuerySegmentedAsync(query, null);
            return queryResult?.Results?.Count > 0 ? queryResult.Results[0] : null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while getting user by name: {ex.Message}");
            return null;
        }
    }
}

