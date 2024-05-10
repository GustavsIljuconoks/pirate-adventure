using System.Security.Cryptography;
using System.Text;
using BattleshipPirateAdventure.Core.Queries;
using BattleshipPirateAdventure.SQLStorage.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BattleshipPirateAdventure.SQLStorage.CommandHandlers;
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Core.GamePlayer?>
{
    private readonly BattleshipContext _context;

    public CreateUserCommandHandler(BattleshipContext context)
    {
        _context = context;
    }

    public async Task<Core.GamePlayer?> Handle(CreateUserCommand request, CancellationToken token)
    {
        var userExists = _context.GamePlayers.AnyAsync(u => u.Username == request.Username || u.Email == request.Email, token).Result;
        
        if (!userExists) 
        {
            string hashedPassword = HashPassword(request.Password);

            var newUser = new GamePlayer
            {
                Username = request.Username,
                Email = request.Email,
                Password = hashedPassword,
            };

            _context.GamePlayers.Add(newUser);
            await _context.SaveChangesAsync(token);

            return new Core.GamePlayer { Id = newUser.Username };
        }

        return new Core.GamePlayer { };
    }

    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}
