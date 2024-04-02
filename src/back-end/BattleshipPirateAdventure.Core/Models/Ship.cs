namespace BattleshipPirateAdventure.Core.Models;

public class Ship
{
    public Ship(int id, string name, int size, Location headLocation, Orientation orientation, int? hitCount = 0)
    {
        Id = id;
        Name = name;
        Size = size;
        HeadLocation = headLocation;
        Orientation = orientation;
        HitCount = hitCount;
        SailStates = new bool[size];

        if (hitCount is > 0)
        {
            for (var i = 0; i < hitCount; i++)
            {
                Hit();
            }
        }
    }

    public int Id { get; }
    public string Name { get; }
    public int Size { get; }
    public Location HeadLocation { get; }
    public Orientation Orientation { get; }
    public int? HitCount { get; }
    private bool[] SailStates { get; }

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
