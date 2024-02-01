namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class InitFieldRequestDto
{
    public string? Player1 { get; set; }

    public string? Player2 { get; set; }

    public required List<ShipDto> Ships { get; set; }
}