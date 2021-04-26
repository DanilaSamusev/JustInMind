using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface IProjectRepository
    {
        public Task<Project> GetAsync(int id);

        public Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId);

        public Task<IEnumerable<Project>> GetAllUserColaborate(int userId);

        public Task<int> InsertAsync(Project entity);

        public Task<bool> DeleteAsync(Project entity);

        public Task<bool> LeaveAsync(UsersToProjects entity);
    }
}
