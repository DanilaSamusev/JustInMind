using JustInMind.BLL.Interfaces;

using JustInMindApp.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading.Tasks;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly JustInMindContext dbContext;
        private readonly IProjectService projectService;

        public ProjectController(IProjectService projectService)
        {
            dbContext = new JustInMindContext();

            this.projectService = projectService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await projectService.GetAsync(id);

            return new ObjectResult(project);
        }

        [HttpGet("getAllUserOwn")]
        public async Task<IActionResult> GetAllUserOwn()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);

            var projects = await projectService.GetAllUserOwnAsync(userId);

            return new ObjectResult(projects);
        }

        [HttpGet("getAllUserCollaborate")]
        public async Task<IActionResult> GetAllUserColaborate()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);

            var projects = await projectService.GetAllUserColaborate(userId);

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
