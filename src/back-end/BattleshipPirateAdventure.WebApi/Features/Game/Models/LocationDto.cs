using BattleshipPirateAdventure.Core.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class LocationDto
{
    public int Row { get; set; }
    public int Column { get; set; }
}

public static class LocationDtoExtensions
{
    public static LocationDto MapFromDomain(this Location location)
    {
        return new LocationDto
        {
            Row = location.Row,
            Column = location.Column
        };
    }
}
