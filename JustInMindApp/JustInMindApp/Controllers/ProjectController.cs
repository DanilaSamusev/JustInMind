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
                                    "LEFT JOIN Projects p ON p.id = up.projectId " +
                                    $"WHERE CollaboratorId = {userId}")
                        .ToList();

            return new ObjectResult(projects);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Project project)
        {
            if (string.IsNullOrWhiteSpace(project.Name))
            {
                return BadRequest(); 
            }

            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);

            project.OwnerId = userId;

            dbContext.Projects.Add(project);
            dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Route("deleteProject/{id}")]
        public IActionResult Delete(int id)
        {
            var project = dbContext.Projects.FirstOrDefault(p => p.Id == id);

            if (project != null)
            {
                dbContext.Projects.Remove(project);
                dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("leaveProject/{id}")]
        public IActionResult LeaveProject(int id)
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);
            var project = dbContext.UsersToProjects.FirstOrDefault(pu => pu.Id == id || pu.CollaboratorId == userId);

            if (project != null)
            {
                dbContext.UsersToProjects.Remove(project);
                dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }
    }
}
