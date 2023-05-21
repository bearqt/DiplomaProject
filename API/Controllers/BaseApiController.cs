using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DiplomaProject.Controllers;

[ApiController]
[Route("api/{controller}")]
public class BaseApiController : ControllerBase
{
    protected IMediator Mediator { get; }
}