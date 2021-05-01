using JustInMind.BLL.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll([FromQuery] int projectId)
        {
            var tasks = await _taskService.GetAllByProjectIdAsync(projectId);

            if (tasks != null)
            {
                return new ObjectResult(tasks);
            }

            return NotFound();
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> Get(int taskId)
        {
            var task = await _taskService.GetDetailedTaskByIdAsync(taskId);

            if (task != null)
            {
                return new ObjectResult(task);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JustInMind.Shared.Models.Task task)
        {
            if (task != null)
            {
                await _taskService.InsertAsync(task);
                return Ok(task.Id);
            }

            else return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JustInMind.Shared.Models.Task task)
        {
            if (task != null)
            {
                await _taskService.UpdateAsync(task);
                return Ok(task.Id);
            }

            else return BadRequest();
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> Delete(int taskId)
        {
            var task = await _taskService.GetSingleByIdAsync(taskId);

            if (task != null)
            {
                await _taskService.DeleteAsync(task);
                return Ok();
            }

            return NotFound();
        }
    }
}
