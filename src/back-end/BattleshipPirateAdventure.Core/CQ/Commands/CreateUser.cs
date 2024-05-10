using MediatR;

namespace BattleshipPirateAdventure.Core.Queries;

public class CreateUserCommand : IRequest<GamePlayer?>
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}
