namespace BattleshipPirateAdventure.WebApi.Features.Shared.Models;

public sealed class CreateLink(string rel, string href) : Link(rel, href, HttpMethod.Post);
