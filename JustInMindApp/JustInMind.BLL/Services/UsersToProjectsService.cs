using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Threading.Tasks;

namespace JustInMind.BLL.Services
{
    public class UsersToProjectsService : IUsersToProjectsService
    {
        private readonly IUsersToProjectsRepository usersToProjectsRepository;

        public UsersToProjectsService(IUsersToProjectsRepository usersToProjectsRepository)
        {
            this.usersToProjectsRepository = usersToProjectsRepository;
        }

        public async Task<int> InsertAsync(UsersToProjects entity)
        {
            return await this.usersToProjectsRepository.InsertAsync(entity);
        }
    }
}
