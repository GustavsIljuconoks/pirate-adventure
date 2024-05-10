using MediatR;
using BattleshipPirateAdventure.SQLStorage.Models;
using BattleshipPirateAdventure.Core.Queries;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace BattleshipPirateAdventure.SQLStorage.QueryHandlers;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, Core.GamePlayer?>
{
    private readonly BattleshipContext _context;

    public GetUserQueryHandler(BattleshipContext context)
    {
        _context = context;
    }

    public async Task<Core.GamePlayer?> Handle(GetUserQuery query, CancellationToken token)
    {
        var user = _context.GamePlayers.FirstOrDefaultAsync(u => u.Username == query.Username).Result;

        if (user == null)
        {
            throw new KeyNotFoundException($"User not found.");
        }

        if (VerifyPassword(query.Password, user.Password))
        {
            return new Core.GamePlayer { Id = user.Username };
        }

        return null;
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        using (var sha256 = SHA256.Create())
        {
            // Compute the hash of the provided password
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            string hashedPasswordToCompare = Convert.ToBase64String(hashedBytes);

            // Compare the hashed password with the computed hash
            return hashedPassword == hashedPasswordToCompare;
        }
    }
}
