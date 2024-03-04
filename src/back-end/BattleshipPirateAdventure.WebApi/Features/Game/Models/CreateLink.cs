namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public sealed class CreateLink(string rel, string href) : Link(rel, href, HttpMethod.Post);
