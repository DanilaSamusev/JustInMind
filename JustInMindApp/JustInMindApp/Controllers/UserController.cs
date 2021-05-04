using JustInMind.BLL.Interfaces;
using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUsersToProjectsService _usersToProjectsService;
        private readonly IUserService _userService;

        public UserController(IUserService userService, IUsersToProjectsService usersToProjectsService)
        {
            _userService = userService;
            _usersToProjectsService = usersToProjectsService;
        }

        [HttpGet]
        [Route("getAllColaborators/{projectId}")]
        public async Task<IActionResult> GetAllColaborators(int projectId)
        {
            var users = await _userService.GetAllColaboratorsByProjectIdAsync(projectId);

            return new ObjectResult(users);
        }

        [HttpPost("addColaborator")]
        public async Task<IActionResult> AddColaborator(AddUserAsColaboratorRequset requset)
        {
            var user = await _userService.GetByEmailAsync(requset.UserEmail);

            if (user == null)
            {
                return BadRequest();
            }

            var entity = new UsersToProjects
            {
                ProjectId = requset.ProjectId,
                UserId = user.Id,
                UserRoleId = requset.UserRoleId
            };

            await _usersToProjectsService.InsertAsync(entity);

            return Ok();
        }

        [HttpDelete("removeColaborator")]
        public async Task<IActionResult> DeleteColaborator([FromBody] DeleteColaboratorRequest request)
        {
            var entity = await _usersToProjectsService.GetByProjetcIdAndUserIdAsync(request.ProjectId, request.UserId);

            if (entity == null)
            {
                return BadRequest("User is not a colaborator of this project!");
            }

            await _usersToProjectsService.DeleteAsync(entity);

            return Ok();
        }
    }
}
