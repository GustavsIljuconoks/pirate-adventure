using Microsoft.AspNetCore.SignalR;

namespace BattleshipPirateAdventure.WebApi.Features.Chat;

public class JoinRoomPayload
{
    public required string Username { get; set; }
    public required string ChatRoom { get; set; }
}

public class SendMessagePayload
{
    public required string Username { get; set; }
    public required string Message { get; set; }
}

public class ChatHub : Hub
{
    public async Task JoinRoom(JoinRoomPayload payload)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, payload.ChatRoom);
        await Clients.Group(payload.ChatRoom).SendAsync("RoomJoined", payload.Username, $"{payload.Username} joined {payload.ChatRoom}");
    }

    public async Task SendMessage(SendMessagePayload payload)
    {
        await Clients.All.SendAsync("ReceiveMessage", payload.Username, payload.Message);
    }
}


