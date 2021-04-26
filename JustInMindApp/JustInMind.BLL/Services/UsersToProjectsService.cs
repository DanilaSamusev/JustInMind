using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Threading.Tasks;

namespace JustInMind.BLL.Services
{
    public class UsersToProjectsService : IUsersToProjectsService
    {
        private readonly IUsersToProjectsRepository _usersToProjectsRepository;

        public UsersToProjectsService(IUsersToProjectsRepository usersToProjectsRepository)
        {
            _usersToProjectsRepository = usersToProjectsRepository;
        }

        public async Task<UsersToProjects> GetByProjetcIdAndUserIdAsync(int projectId, int userId)
        {
            return await _usersToProjectsRepository.GetByProjetcIdAndUserIdAsync(projectId, userId);
        }

        public async Task<int> InsertAsync(UsersToProjects entity)
        {
            return await _usersToProjectsRepository.InsertAsync(entity);
        }

        public async Task<bool> DeleteAsync(UsersToProjects entity)
        {
            return await _usersToProjectsRepository.DeleteAsync(entity);
        }
    }
}
