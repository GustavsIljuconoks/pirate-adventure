using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public class LoginCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class LoginCommandHandler
{
    private readonly ITableStorageService _storageService;

    public LoginCommandHandler(ITableStorageService storageService)
    {
        _storageService = storageService;
    }

    public async Task<IActionResult> Handle(LoginCommand command)
    {
        var user = await _storageService.GetUserByName(command.Username);

        if (user == null)
        {
            return new UnauthorizedResult();
        }

        var passwordHasher = new PasswordHasher<UserItemEntity>();
        if (passwordHasher.VerifyHashedPassword(user, user.Password, command.Password) == PasswordVerificationResult.Failed)
        {
            return new UnauthorizedObjectResult("Invalid username or password");
        }

        return new OkObjectResult("Authentication successful");
    }
}
