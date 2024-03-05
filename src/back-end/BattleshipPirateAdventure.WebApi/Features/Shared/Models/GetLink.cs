namespace BattleshipPirateAdventure.WebApi.Features.Shared.Models;

public sealed class GetLink(string rel, string href) : Link(rel, href, HttpMethod.Get);
