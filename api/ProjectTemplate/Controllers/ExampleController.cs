using Labatt.Core.WebApi;
using Microsoft.AspNetCore.Mvc;
using ProjectTemplate.Domain;

namespace ProjectTemplate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
    [Authorize(Permission.View)]
    [HttpGet("something")]
    public IActionResult GetSomething()
    {
        return Ok();
    }
}

