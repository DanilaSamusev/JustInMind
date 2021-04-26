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
        private readonly IProjectRepository _projectRepository;

        private readonly IUsersToProjectsService _usersToProjectsService;

        public ProjectService(IProjectRepository projectRepository, IUsersToProjectsService usersToProjectsService)
        {
            _projectRepository = projectRepository;
            _usersToProjectsService = usersToProjectsService;
        }

        public async Task<Project> GetAsync(int id)
        {
            return await _projectRepository.GetAsync(id);
        }

        public async Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId)
        {
            return await _projectRepository.GetAllUserOwnAsync(userId);
        }

        public async Task<IEnumerable<Project>> GetAllUserColaborateAsync(int userId)
        {
            return await _projectRepository.GetAllUserColaborate(userId);
        }

        public async Task AddAsync(CreateProjectRequest request)
        {
            var project = new Project
            {
                Name = request.Name,
            };

            var projectId = await _projectRepository.InsertAsync(project);

            var usersToProjects = new UsersToProjects
            {
                ProjectId = projectId,
                UserId = request.OwnerId,
                // TODO: find out how to remove this hardcode
                UserRoleId = 5,
            };

            await _usersToProjectsService.InsertAsync(usersToProjects);
        }

        public async Task<bool> DeleteAsync(Project entity)
        {
           return await _projectRepository.DeleteAsync(entity);
        }

        public async Task<bool> LeaveAsync(UsersToProjects entity)
        {
            return await _projectRepository.LeaveAsync(entity);
        }
    }
}
