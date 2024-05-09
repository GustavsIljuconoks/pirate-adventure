using MediatR;
using BattleshipPirateAdventure.SQLStorage.Models;
using BattleshipPirateAdventure.Core.Queries;

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
        var user = _context.GamePlayers.FirstOrDefault(u => u.Username == query.Username && u.Password == query.Password);

        if (user == null)
        {
            throw new KeyNotFoundException($"User not found.");
        }

        var userDomain = new Core.GamePlayer { Id = user.Username };

        return userDomain;
    }
}
