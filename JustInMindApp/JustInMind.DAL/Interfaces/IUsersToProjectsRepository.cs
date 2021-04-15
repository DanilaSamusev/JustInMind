using JustInMind.Shared.Models;

using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface IUsersToProjectsRepository
    {
        public Task<int> InsertAsync(UsersToProjects entity);
    }
}
