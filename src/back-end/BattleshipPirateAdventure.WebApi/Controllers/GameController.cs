using BattleshipPirateAdventure.Core;
using BattleshipPirateAdventure.Core.Models;
using BattleshipPirateAdventure.WebApi.Controllers.DtoModels;
using Microsoft.AspNetCore.Mvc;

namespace BattleshipPirateAdventure.WebApi.Controllers
{
    [ApiController]
    [Route("Game")]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route(nameof(CreateGame))]
        public ActionResult<CreateGameResponse> CreateGame(CreateGameRequest request)
        {
            if (request == null || request.Creator == "")
            {
                return BadRequest("Invalid creator");
            }

            var id = "99";

            _logger.LogInformation($"Game `{id}` created");

            return new CreateGameResponse
            {
                Id = id,
                Size = new FieldSizeDto(10, 10)
            };
        }

        [HttpPost]
        [Route(nameof(Player1InitField))]
        public ActionResult<InitFieldResponse> Player1InitField(InitFieldRequest request)
        {
            var engine = new GameEngine();
            var game = engine.CreateGame(10, 10);
             
            var player1 = game.Player1;

            player1.InitField(MapFromDto(request.Ships));

            return new InitFieldResponse
            {
                Message = "Initialized game field"
            };
        }

        private List<Ship> MapFromDto(List<ShipDto> ships)
        {
            return ships
                .Select(x => new Ship(x.Name,
                    x.Size,
                    new Core.Models.Location("A1", x.HeadLocation.Column, x.HeadLocation.Row),
                    x.Orientation))
                .ToList();
        }
    }

    public class InitFieldRequest
    {
        public string Id { get; set; }

        public List<ShipDto> Ships { get; set; }
    }

    public class InitFieldResponse
    {
        public String Message{ get; set; }
    }

    public class CreateGameRequest
    {
        public string Creator { get; set; }
    }

    public class CreateGameResponse
    {
        public string Id { get; set; }
        public FieldSizeDto Size { get; set; }
    }

}
