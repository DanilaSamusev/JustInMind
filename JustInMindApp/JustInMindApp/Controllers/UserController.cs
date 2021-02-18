﻿using JustInMindApp.Models;

using Microsoft.AspNetCore.Mvc;

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

		[HttpPost]
		public IActionResult Post([FromBody] User user)
		{
			if (user != null)
			{
				dbContext.Users.Add(user);
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
				return Ok();
			}

			return BadRequest();
		}
	}
}