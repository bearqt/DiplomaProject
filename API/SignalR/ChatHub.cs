using Application.Message;
using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace DiplomaProject.SignalR;

public class ChatHub : Hub
{
    private readonly IMediator _mediator;

    public ChatHub(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task SendMessage(Create.Command command)
    {
        var message = await _mediator.Send(command);

        await Clients.Group(command.ChatId.ToString())
            .SendAsync("ReceiveMessage", message);
        
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var chatId = httpContext.Request.Query["chatId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        var result = await _mediator.Send(new List.Query { ChatId = Guid.Parse(chatId) });
        await Clients.Caller.SendAsync("LoadMessages", result);
    }
}