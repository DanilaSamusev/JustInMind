using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface ITaskRepository
    {
        Task<Shared.Models.Task> GetSingleByIdAsync(int id);

        Task<IEnumerable<Shared.Models.Task>> GetAllByProjectIdAsync(int projectId);

        Task<DetailedTask> GetDetailedTaskByIdAsync(int taskId);

        Task<int> InsertAsync(Shared.Models.Task entity);

        Task<bool> UpdateAsync(Shared.Models.Task entity);

        Task<bool> DeleteAsync(Shared.Models.Task entity); 
    }
}
