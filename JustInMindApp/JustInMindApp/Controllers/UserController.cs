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
    public class UserController : ControllerBase
    {
        private readonly JustInMindContext dbContext;
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            dbContext = new JustInMindContext();
            this._userService = userService;
        }

        [HttpGet]
        [Route("getAllColaborators/{projectId}")]
        public async Task<IActionResult> GetAllColaborators(int projectId)
        {
            var users = await _userService.GetAllColaboratorsByProjectIdAsync(projectId);

            if (users != null)
            {
                return new ObjectResult(users);
            }

            return BadRequest();
        }

        [HttpPost("addColaborator")]
        public async Task<IActionResult> AddColaborator(AddUserAsColaboratorRequset requset)
        {
            var user = await _userService.GetByEmailAsync(requset.UserEmail);

            if (user == null)
            {
                return BadRequest("User not exists!");
            }

            var entity = new UsersToProjects
            {
                ProjectId = requset.ProjectId,
                UserId = user.Id,
                UserRoleId = requset.UserRoleId
            };

            dbContext.UsersToProjects.Add(entity);
            dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("removeColaborator")]
        public IActionResult DeleteColaborator([FromBody] DeleteColaboratorRequest request)
        {
            var usersToProjectEntity = dbContext.UsersToProjects
                .First(up => up.UserId == request.UserId && up.ProjectId == request.ProjectId);

            if (usersToProjectEntity == null)
            {
                return BadRequest("User is not a colaborator of this project!");
            }

            dbContext.UsersToProjects.Remove(usersToProjectEntity);
            dbContext.SaveChanges();

            return BadRequest();
        }
    }
}
