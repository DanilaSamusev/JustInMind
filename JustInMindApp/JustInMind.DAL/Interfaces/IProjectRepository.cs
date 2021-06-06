using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project> GetAsync(int id);

        Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId);

        Task<IEnumerable<Project>> GetAllUserColaborate(int userId);

        Task<int> InsertAsync(Project entity);

        public Task<bool> UpdateAsync(Project entity);

        Task<bool> DeleteAsync(Project entity);

        Task<bool> LeaveAsync(UsersToProjects entity);
    }
}
