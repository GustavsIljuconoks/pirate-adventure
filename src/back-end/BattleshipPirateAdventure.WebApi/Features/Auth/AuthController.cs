using Microsoft.AspNetCore.Mvc;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;

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

        // Initialize Azure Storage Account pointing to Azurite
        CloudStorageAccount storageAccount = CloudStorageAccount.Parse("UseDevelopmentStorage=true");
        CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

        // Get a reference to the table
        _table = tableClient.GetTableReference("users");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _storageService.GetUserByName(request.Username);

        if (user == null)
        {
            return Unauthorized("User not found");
        }

        if (user.Password != request.Password)
        {
            return Unauthorized("Invalid username or password");
        }

        return Ok("Authentication successful");
    }

    [HttpGet]
    [Route("users", Name = nameof(GetUsers))]
    public async Task<IActionResult> GetUsers()
    {
        var entities = new List<UserItemEntity>();

        TableContinuationToken token = null;
        do
        {
            TableQuery<UserItemEntity> query = new TableQuery<UserItemEntity>();
            TableQuerySegment<UserItemEntity> resultSegment = await _table.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;

            entities.AddRange(resultSegment.Results);

        } while (token != null);

        return Ok(entities);
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}
