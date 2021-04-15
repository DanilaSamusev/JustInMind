using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository projectRepository;

        private readonly IUsersToProjectsService usersToProjectsService;

        public ProjectService(IProjectRepository projectRepository, IUsersToProjectsService usersToProjectsService)
        {
            this.projectRepository = projectRepository;
            this.usersToProjectsService = usersToProjectsService;
        }

        public async Task<Project> GetAsync(int id)
        {
            return await projectRepository.GetAsync(id);
        }

        public async Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId)
        {
            return await projectRepository.GetAllUserOwnAsync(userId);
        }

        public async Task<IEnumerable<Project>> GetAllUserColaborateAsync(int userId)
        {
            return await projectRepository.GetAllUserColaborate(userId);
        }

        public async Task AddAsync(CreateProjectRequest request)
        {
            var project = new Project
            {
                Name = request.Name,
            };

            var projectId = await projectRepository.InsertAsync(project);

            var usersToProjects = new UsersToProjects
            {
                ProjectId = projectId,
                UserId = request.OwnerId,
                // TODO: find out how to remove this hardcode
                UserRoleId = 5,
            };

            await usersToProjectsService.InsertAsync(usersToProjects);
        }
    }
}
