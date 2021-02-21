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
        [Route("getAll")]
        public IActionResult GetAll()
        {
            var tasks = dbContext.Tasks;

            if (tasks != null)
            {
                return new ObjectResult(tasks);
            }

            return BadRequest();
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
        public IActionResult Post([FromBody] Task task)
        {
            if (task != null)
            {
                dbContext.Tasks.Add(task);
                dbContext.SaveChanges();
                return Ok();
            }

            else return BadRequest();
        }
       
        [HttpPut]
        public IActionResult Put([FromBody] Task task)
        {
            if (task != null)
            {
                dbContext.Tasks.Update(task);
                dbContext.SaveChanges();
                return Ok();
            }

            else return BadRequest();
        }
       
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (task != null)
            {
                dbContext.Tasks.Remove(task);
                dbContext.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }
    }
}
