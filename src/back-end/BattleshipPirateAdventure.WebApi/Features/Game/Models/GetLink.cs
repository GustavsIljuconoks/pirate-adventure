namespace BattleshipPirateAdventure.WebApi.Features.Game.Models;

public sealed class GetLink(string rel, string href) : Link(rel, href, HttpMethod.Get);
