using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;
using TypeGen.Core.TypeAnnotations;

namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

[ExportTsInterface]
public class GamePlayerDto
{
    public string? Id { get; set; }

    public PlayerType PlayerType { get; set; }

    public GameFieldDto Field { get; set; }

    public PlayerState State { get; set; }

    public List<ShipDto> Ships { get; set; } = [];
}

public static class GamePlayerExtensions
{
    public static GamePlayerDto MapFromDomain(this GamePlayer player)
    {
        return new GamePlayerDto
        {
            Id = player.Id,
            PlayerType = player.PlayerType,
            Field = player.Field.MapFromDomain(),
            State = player.State,
            Ships = player.Ships.Select(s => s.MapFromDomain()).ToList()
        };
    }
}
