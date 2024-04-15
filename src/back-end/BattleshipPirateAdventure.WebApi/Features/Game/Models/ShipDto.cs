using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class ShipDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Size { get; set; }
    public required LocationDto HeadLocation { get; set; }
    public Orientation Orientation { get; set; }
    public int? HitCount { get; set; }
    public bool IsDestroyed { get; set; }
}

public static class ShipExtensions
{
    public static ShipDto MapFromDomain(this Ship ship)
    {
        return new ShipDto
        {
            Id = ship.Id,
            Name = ship.Name,
            Size = ship.Size,
            Orientation = ship.Orientation,
            HeadLocation = ship.HeadLocation.MapFromDomain(),
            HitCount = ship.HitCount,
            IsDestroyed = ship.IsDowned()
        };
    }
}

public static class ListOfShipDtoExtensions
{
    public static List<Ship> MapFromDto(this List<ShipDto> ships, GameField field)
    {
        return ships
            .Select(x => new Ship(x.Id,
                                  x.Name,
                                  x.Size,
                                  field.GetLocation(x.HeadLocation.Row, x.HeadLocation.Column),
                                  x.Orientation,
                                  x.HitCount))
            .ToList();
    }
}
