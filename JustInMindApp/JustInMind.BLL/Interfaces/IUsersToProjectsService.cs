﻿using JustInMind.Shared.Models;

using System.Threading.Tasks;

namespace JustInMind.BLL.Interfaces
{
    public interface IUsersToProjectsService
    {
        public Task<UsersToProjects> GetByProjetcIdAndUserIdAsync(int projectId, int userId);

        public Task<int> InsertAsync(UsersToProjects entity);

        public Task<bool> DeleteAsync(UsersToProjects entity);
    }
}
