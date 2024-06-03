using Azure;
using Azure.Data.Tables;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class GameItemEntity : ITableEntity
{
    public string player1 { get; set; }
    public string player2 { get; set; }
    public string winner { get; set; }
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
