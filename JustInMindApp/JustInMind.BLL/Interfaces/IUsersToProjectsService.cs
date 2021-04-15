using JustInMind.Shared.Models;

using System.Threading.Tasks;

namespace JustInMind.BLL.Interfaces
{
    public interface IUsersToProjectsService
    {
        public Task<int> InsertAsync(UsersToProjects entity);
    }
}
