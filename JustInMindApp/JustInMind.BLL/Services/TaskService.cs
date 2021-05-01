using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<Shared.Models.Task> GetSingleByIdAsync(int id)
        {
            return await _taskRepository.GetSingleByIdAsync(id);
        }

        public async Task<IEnumerable<Shared.Models.Task>> GetAllByProjectIdAsync(int projectId)
        {
            return await _taskRepository.GetAllByProjectIdAsync(projectId);
        }

        public async Task<DetailedTask> GetDetailedTaskByIdAsync(int taskId)
        {
            return await _taskRepository.GetDetailedTaskByIdAsync(taskId);
        }

        public async Task<int> InsertAsync(Shared.Models.Task entity)
        {
            return await _taskRepository.InsertAsync(entity);
        }

        public async Task<bool> UpdateAsync(Shared.Models.Task entity)
        {
            return await _taskRepository.UpdateAsync(entity);
        }

        public async Task<bool> DeleteAsync(Shared.Models.Task entity)
        {
            return await _taskRepository.DeleteAsync(entity);
        }
    }
}
