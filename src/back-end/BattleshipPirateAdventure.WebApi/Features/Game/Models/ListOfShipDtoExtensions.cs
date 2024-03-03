using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public static class ListOfShipDtoExtensions
{
    public static List<Ship> MapFromDto(this List<ShipDto> ships, GameField field)
    {
        return ships
            .Select(x => new Ship(x.Name,
                                  x.Size,
                                  field.GetLocation(x.HeadLocation.Column, x.HeadLocation.Row),
                                  x.Orientation))
            .ToList();
    }
}