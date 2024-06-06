using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Features.CQ;


public class Result<T>
{
    public T Value { get; set; }
    public string Error { get; set; }
    public bool IsSuccess => string.IsNullOrEmpty(Error);
}

public class RegisterCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}

public class RegisterCommandHandler(ITableStorageService storageService)
{
    public async Task<IActionResult> Handle(RegisterCommand request)
    {
        try
        {
            var user = await storageService.RegisterUser(request.Username, request.Password, request.Email);
            return new OkObjectResult("User created successfully");
        }
        catch (Exception ex)
        {
            return new UnauthorizedObjectResult(ex.Message);
        }
    }
}


