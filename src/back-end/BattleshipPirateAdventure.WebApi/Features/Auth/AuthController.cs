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

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var registerCommand = new CreateUserCommand
        {
            Username = request.Username,
            Email = request.Email,
            Password = request.Password
        };

        var result = await _mediator.Send(registerCommand);
        if (result.Id != null)
        {
            return Ok("User created successfully");
        }

        return Conflict("User already exists");
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

public class RegisterRequestDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
