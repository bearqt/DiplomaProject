using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DiplomaProject.Controllers;

public class ProfilesController : BaseApiController
{
    private readonly IMediator _mediator;

    public ProfilesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
        return Ok(await _mediator.Send(new Details.Query { Username = username }));
    }
}