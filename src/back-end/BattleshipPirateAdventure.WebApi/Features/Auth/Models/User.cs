using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace BattleshipPirateAdventure.WebApi.Features.Auth.Models;

public class UserItemEntity : ITableEntity
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public string ETag { get; set; }

    public void ReadEntity(IDictionary<string, EntityProperty> properties, OperationContext operationContext)
    {
        this.Email = properties["email"].StringValue;
        this.Password = properties["password"].StringValue;
    }

    public IDictionary<string, EntityProperty> WriteEntity(OperationContext operationContext)
    {
        // Implement this method to serialize entity properties for storage in Azure Table Storage
        // Example:
        // var properties = new Dictionary<string, EntityProperty>();
        // properties.Add("Id", new EntityProperty(this.Id));
        // properties.Add("Name", new EntityProperty(this.Name));
        // properties.Add("Password", new EntityProperty(this.Password));
        // return properties;
        return null;
    }
}
