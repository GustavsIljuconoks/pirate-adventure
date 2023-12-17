namespace BattleshipPirateAdventure.Core.Models;

public class Ship
{
    public Ship(string name, int size, Location headLocation, Orientation orientation)
    {
        Name = name;
        Size = size;
        HeadLocation = headLocation;
        Orientation = orientation;
    }

    public string Name { get; }
    public int Size { get; }
    public Location HeadLocation { get; }
    public Orientation Orientation { get; }
}
