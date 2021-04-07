using JustInMindApp.Models;
using JustInMindApp.Requests;

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
    public class UserController : ControllerBase
    {
        private readonly JustInMindContext dbContext;

        public UserController()
        {
            dbContext = new JustInMindContext();
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            var users = dbContext.Users.Include(u => u.Role);

            if (users != null)
            {
                return new ObjectResult(users);
            }

            return BadRequest();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = dbContext.Users.Include(u => u.Role).FirstOrDefault(u => u.Id == id);

            if (user != null)
            {
                return new ObjectResult(user);
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("getAllColaborators/{projectId}")]
        public IActionResult GetAllColaborators(int projectId)
        {
            var users = dbContext
                .Users
                .FromSqlRaw("SELECT CollaboratorId as 'Id', CollaboratorRoleId as 'RoleId', Name, Password " +
                            "FROM UsersToProjects up " +
                            "LEFT JOIN Users u ON u.Id = up.CollaboratorId " +
                            $"WHERE up.ProjectId = {projectId}")
                .Include(u => u.Role)
                .ToList();

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
                return BadRequest("Error: user with specified name doesn't exist!");
            }

            var entity = new UsersToProjects
            {
                ProjectId = requset.ProjectId,
                CollaboratorId = user.Id,
                CollaboratorRoleId = requset.UserRoleId
            };

            dbContext.UsersToProjects.Add(entity);
            dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteColaborator([FromBody] DeleteColaboratorRequest request)
        {
            var usersToProjectEntity = dbContext.UsersToProjects
                .First(up => up.CollaboratorId == request.UserId && up.ProjectId == request.ProjectId);

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
