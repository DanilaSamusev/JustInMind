using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly JustInMindContext dbContext;

        public ProjectController()
        {
            dbContext = new JustInMindContext();
        }

        [HttpGet("getAll")]
        public IActionResult GetAllByOwnerId()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);
            var projects = dbContext.Projects.Where(p => p.OwnerId == userId);

            return new ObjectResult(projects);
        }
    }
}
