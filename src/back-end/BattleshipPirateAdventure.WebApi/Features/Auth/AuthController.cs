using BattleshipPirateAdventure.WebApi.Features.CQ;
using Microsoft.AspNetCore.Mvc;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;

namespace BattleshipPirateAdventure.WebApi.Features.Auth;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly ITableStorageService _storageService;

    public AuthController(ITableStorageService storageService, IConfiguration configuration)
    {
        _config = configuration;
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var handler = new LoginCommandHandler(_storageService);
        return await handler.Handle(command);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command)
    {
        var handler = new RegisterCommandHandler(_storageService);
        return await handler.Handle(command);
    }
}
