using Application.Message;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DiplomaProject.Controllers;

public class MessagesController : BaseApiController
{
    private readonly IMediator _mediator;

    public MessagesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateMessage(Create.Command command)
    {
        return Ok(await _mediator.Send(command));
    }
}