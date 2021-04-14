using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Realizations
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }

        public async Task<Project> GetAsync(int id)
        {
            return await projectRepository.GetAsync(id);
        }

        public async Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId)
        {
            return await projectRepository.GetAllUserOwnAsync(userId);
        }

        public async Task<IEnumerable<Project>> GetAllUserColaborate(int userId)
        {
            return await projectRepository.GetAllUserColaborate(userId);
        }
    }
}
