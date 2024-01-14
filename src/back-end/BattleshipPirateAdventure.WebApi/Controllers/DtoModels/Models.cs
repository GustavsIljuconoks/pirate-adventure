using BattleshipPirateAdventure.Core.Models;

namespace BattleshipPirateAdventure.WebApi.Controllers.DtoModels
{
    public class ShipDto
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public LocationDto HeadLocation { get; set; }
        public Orientation Orientation { get; set; }
    }

    public class LocationDto
    {
        public int Row { get; set; }
        public int Column { get; set; }
    }

    public class FieldSizeDto(int columns, int rows)
    {
        public int Columns { get; set; } = columns;
        public int Rows { get; set; } = rows;
    }
}
