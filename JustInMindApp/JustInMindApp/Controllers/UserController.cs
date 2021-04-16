using JustInMind.BLL.Interfaces;
using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using JustInMindApp.Models;

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
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            dbContext = new JustInMindContext();
            this.userService = userService;
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            var users = dbContext.Users;

            if (users != null)
            {
                return new ObjectResult(users);
            }

            return BadRequest();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == id);

            if (user != null)
            {
                return new ObjectResult(user);
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("getAllColaborators/{projectId}")]
        public async Task<IActionResult> GetAllColaborators(int projectId)
        {
            var users = await this.userService.GetAllColaboratorsByProjectIdAsync(projectId);

            if (users != null)
            {
                return new ObjectResult(users);
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if (user != null)
            {
                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult Put([FromBody] User user)
        {
            if (user != null)
            {
                dbContext.Users.Update(user);
                dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("addColaborator")]
        public IActionResult AddColaborator(AddUserAsColaboratorRequset requset)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Name == requset.UserName);

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
