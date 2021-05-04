using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Interfaces
{
    public interface IProjectService
    {
        public Task<Project> GetAsync(int id);

        public Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId);

        public Task<IEnumerable<Project>> GetAllUserColaborateAsync(int userId);

        public System.Threading.Tasks.Task AddAsync(CreateProjectRequest request);

        public Task<bool> DeleteAsync(Project entity);

        public Task<bool> LeaveAsync(UsersToProjects entity);
    }
}
