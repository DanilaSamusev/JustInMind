using Dapper;
using Dapper.Contrib.Extensions;

using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JustInMind.DAL.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly string connectionString;

        public ProjectRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<Project> GetAsync(int id)
        {
            using var db = new SqlConnection(connectionString);

            var project = await db.GetAsync<Project>(id);

            return project;
        }

        public async Task<IEnumerable<Project>> GetAllUserOwnAsync(int userId)
        {
            string sql = "SELECT p.Id, p.Name FROM UsersToProjects up " +
                         "LEFT JOIN Projects p ON p.Id = up.ProjectId " +
                         "LEFT JOIN Roles r ON r.Id = up.UserRoleId " +
                         $"WHERE up.UserId = @UserId AND " +
                         "r.Name = 'Owner'";

            using var db = new SqlConnection(connectionString);

            var projects = await db.QueryAsync<Project>(sql, new { UserId = userId });

            return projects;
        }

        public async Task<IEnumerable<Project>> GetAllUserColaborate(int userId)
        {
            string sql = "SELECT p.Id, p.Name FROM UsersToProjects up " +
                         "LEFT JOIN Projects p ON p.Id = up.ProjectId " +
                         "LEFT JOIN Roles r ON r.Id = up.UserRoleId " +
                         $"WHERE up.UserId = @UserId AND " +
                         $"r.Name != 'Owner'";

            using var db = new SqlConnection(connectionString);

            var projects = await db.QueryAsync<Project>(sql, new { UserId = userId });

            return projects;
        }

        public async Task<int> InsertAsync(Project entity)
        {
            using var db = new SqlConnection(connectionString);

            var id = await db.InsertAsync(entity);

            return id;
        }

        public async Task<bool> DeleteAsync(Project entity)
        {
            using var db = new SqlConnection(connectionString);

            return await db.DeleteAsync(entity);
        }

        public async Task<bool> LeaveAsync(UsersToProjects entity)
        {
            using var db = new SqlConnection(connectionString);

            return await db.DeleteAsync(entity);
        }
    }
}
