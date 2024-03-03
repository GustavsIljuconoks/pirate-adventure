namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public class InitFieldRequestDto
{
    public required List<ShipDto> Ships { get; set; }
}
