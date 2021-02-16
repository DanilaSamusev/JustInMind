using JustInMindApp.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;

namespace JustInMindApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Models.Task Get()
        {
            Models.Task task = new Task()
            {
                Name = "FakeName",
                Description = "FakeDescription",
                StateId = 1,
                CategoryId = 1
            };

            return task;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Models.Task task)
        {
            var rng = new Random();

            var context = new JustInMindContext();

            return Ok();
        }
    }
}
