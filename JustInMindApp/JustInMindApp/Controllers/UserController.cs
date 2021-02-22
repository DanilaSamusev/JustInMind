using JustInMindApp.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace JustInMindApp.Controllers
{
	[Route("[controller]")]
	[Produces("application/json")]
	[ApiController]
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

		[HttpDelete]
		public IActionResult Delete(int id)
		{
			var user = dbContext.Users.FirstOrDefault(u => u.Id == id);

			if (user != null)
			{
				dbContext.Users.Remove(user);
				dbContext.SaveChanges();
				return Ok();
			}

			return BadRequest();
		}
	}
}
