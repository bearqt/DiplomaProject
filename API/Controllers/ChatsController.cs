using Application.Chats;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DiplomaProject.Controllers;

[AllowAnonymous]
public class ChatsController : BaseApiController
{

    private readonly IMediator _mediator;

    public ChatsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetChats()
    {
        var chats = await _mediator.Send(new List.Query());
        return Ok(chats);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChat(Guid id)
    {
        var chat = await _mediator.Send(new Details.Query { Id = id });
        return Ok(chat);
    }

    [HttpPost]
    public async Task<IActionResult> CreateChat(Create.Command command)
    {
        await _mediator.Send(command);
        return Ok();
    }

    [HttpPost("join/{chatId}")]
    public async Task<IActionResult> JoinChat(string chatId)
    {
        await _mediator.Send(new Join.Command{ChatId = Guid.Parse(chatId)});
        return Ok();
    }

    [HttpGet("search/{title}")]
    public async Task<IActionResult> SearchChats(string title)
    {
        return Ok(await _mediator.Send(new Search.Query {ChatName = title}));
    }
}