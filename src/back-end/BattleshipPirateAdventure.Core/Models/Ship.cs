namespace BattleshipPirateAdventure.Core.Models;

public class Ship(int id, string name, int size, Location headLocation, Orientation orientation)
{
    public int Id { get; } = id;
    public string Name { get; } = name;
    public int Size { get; } = size;
    public Location HeadLocation { get; } = headLocation;
    public Orientation Orientation { get; } = orientation;
    public bool[] SailStates { get; set; } = new bool[size];

    public bool IsDowned()
    {
        return Array.TrueForAll(SailStates, s => s);
    }

    public bool IsHit()
    {
        return Array.Exists(SailStates, s => s);
    }

    public void Hit()
    {
        if (!IsHit())
        {
            SailStates[0] = true;
        }
        else
        {
            var hitCount = SailStates.Count(s => s);
            SailStates[hitCount] = true;
        }
    }
}
