using Microsoft.AspNetCore.Mvc;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;

namespace BattleshipPirateAdventure.WebApi.Features.Auth;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly CloudTable _table;
    private readonly ITableStorageService _storageService;

    public AuthController(ITableStorageService storageService, IConfiguration configuration)
    {
        _config = configuration;
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));

        var connectionString = _config.GetConnectionString("admiring_blackburn");

        // Initialize Azure Storage Account pointing to Azurite
        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
        CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

        // Get a reference to the table
        _table = tableClient.GetTableReference("users");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var handler = new LoginCommandHandler(_storageService);
        return await handler.Handle(command);
    }
}
