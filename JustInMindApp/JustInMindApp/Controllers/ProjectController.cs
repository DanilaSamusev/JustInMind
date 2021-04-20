using JustInMind.BLL.Interfaces;
using JustInMind.Shared.Requests;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        private readonly JustInMindContext _dbContext;

        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _dbContext = new JustInMindContext();

            _projectService = projectService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _projectService.GetAsync(id);

            return new ObjectResult(project);
        }

        [HttpGet("getAllUserOwn")]
        public async Task<IActionResult> GetAllUserOwn()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);

            var projects = await _projectService.GetAllUserOwnAsync(userId);

            return new ObjectResult(projects);
        }

        [HttpGet("getAllUserCollaborate")]
        public async Task<IActionResult> GetAllUserColaborate()
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);

            var projects = await _projectService.GetAllUserColaborateAsync(userId);

            return new ObjectResult(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateProjectRequest request)
        {        
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);
            request.OwnerId = userId;

            await _projectService.AddAsync(request);

            return Ok();
        }

        [HttpDelete]
        [Route("deleteProject/{id}")]
        public IActionResult Delete(int id)
        {
            var project = _dbContext.Projects.FirstOrDefault(p => p.Id == id);

            if (project != null)
            {
                _dbContext.Projects.Remove(project);
                _dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("leaveProject/{id}")]
        public IActionResult LeaveProject(int id)
        {
            var userId = int.Parse(HttpContext.User.Claims.ToList()[1].Value);
            var project = _dbContext.UsersToProjects.FirstOrDefault(pu => pu.ProjectId == id && pu.UserId == userId);

            if (project != null)
            {
                _dbContext.UsersToProjects.Remove(project);
                _dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }
    }
}
