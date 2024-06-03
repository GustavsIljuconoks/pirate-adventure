using Azure;
using Azure.Data.Tables;

namespace BattleshipPirateAdventure.WebApi.Features.Auth.Models;

public class UserItemEntity : ITableEntity
{
    public string Email { get; set; }
    public string Password { get; set; }
    public int Wins { get; set; }
    public int Cups{ get; set; }
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
