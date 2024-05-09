using Microsoft.AspNetCore.Mvc;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using MediatR;
using BattleshipPirateAdventure.Core.Queries;

namespace BattleshipPirateAdventure.WebApi.Features.Auth;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        GetUserQuery getUserQuery = Map(request);
        var user = await _mediator.Send(getUserQuery);
        return Ok(user);
    }

    private GetUserQuery Map(LoginRequestDto dto)
    {
        return new GetUserQuery
        {
            Username = dto.Username,
            Password = dto.Password
        };
    }
}

public class LoginRequestDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}
