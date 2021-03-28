using JustInMindApp.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("getAllUserOwn")]
        public IActionResult GetProjects()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);

            var projects = dbContext.Projects.Where(p => p.OwnerId == userId);

            return new ObjectResult(projects);
        }

        [HttpGet("getAllUserCollaborate")]
        public IActionResult GetCollaborations()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);           

            var projects = dbContext.Projects
                        .FromSqlRaw("SELECT ProjectId as Id, Name, OwnerId FROM UsersToProjects up " +
                                    "LEFT JOIN Projects p ON p.id = up.collaboratorId " +
                                    $"WHERE CollaboratorId = {userId}")
                        .ToList();

            return new ObjectResult(projects);
        }
    }
}
