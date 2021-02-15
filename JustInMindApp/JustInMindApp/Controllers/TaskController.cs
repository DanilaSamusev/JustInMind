using JustInMindApp.Models;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly JustInMindContext dbContext;

        public TaskController()
        {
            dbContext = new JustInMindContext();
        }

        [HttpGet]
        public Task Get()
        {
            Task task = new Task()
            {
                Name = "FakeName",
                Description = "FakeDescription",
                StateId = 1,
                CategoryId = 1
            };

            return task;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (task != null)
            {
                return new ObjectResult(task);
            }

            return BadRequest();
        }
       
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
       
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
       
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (task != null)
            {
                dbContext.Tasks.Remove(task);
                return Ok();
            }

            return BadRequest();
        }
    }
}
