using JustInMind.BLL.Interfaces;
using JustInMind.Shared.Models;
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
        private readonly IProjectService _projectService;
        private readonly IUsersToProjectsService _usersToProjectsService;

        public ProjectController(IProjectService projectService, IUsersToProjectsService usersToProjectsService)
        {
            _projectService = projectService;
            _usersToProjectsService = usersToProjectsService;
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
            var userId = int.Parse(HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == nameof(JustInMind.Shared.Models.User.Id).ToLower())
                .Value);

            var projects = await _projectService.GetAllUserOwnAsync(userId);

            return new ObjectResult(projects);
        }

        [HttpGet("getAllUserCollaborate")]
        public async Task<IActionResult> GetAllUserColaborate()
        {
            var userId = int.Parse(HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == nameof(JustInMind.Shared.Models.User.Id).ToLower())
                .Value);

            var projects = await _projectService.GetAllUserColaborateAsync(userId);

            return new ObjectResult(projects);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Project project)
        {
            await _projectService.UpdateAsync(project);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateProjectRequest request)
        {
            var userId = int.Parse(HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == nameof(JustInMind.Shared.Models.User.Id).ToLower())
                .Value);

            request.OwnerId = userId;

            await _projectService.AddAsync(request);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var project = await _projectService.GetAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            await _projectService.DeleteAsync(project);

            return Ok();
        }
    }
}
