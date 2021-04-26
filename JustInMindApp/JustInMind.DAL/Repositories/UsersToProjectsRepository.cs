using Dapper;
using Dapper.Contrib.Extensions;

using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JustInMind.DAL.Repositories
{
    public class UsersToProjectsRepository : IUsersToProjectsRepository
    {
        private readonly string connectionString;

        public UsersToProjectsRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<UsersToProjects> GetByProjetcIdAndUserIdAsync(int projectId, int userId)
        {
            string sql = "SELECT * FROM UsersToProjects " +
                         $"WHERE ProjectId = @ProjectId AND UserId = @UserId";

            using var db = new SqlConnection(connectionString);

            return await db.QuerySingleAsync<UsersToProjects>(sql, new { ProjectId = projectId, UserId = userId });
        }

        public async Task<int> InsertAsync(UsersToProjects entity)
        {
            using var db = new SqlConnection(connectionString);

            return await db.InsertAsync(entity);
        }

        public async Task<bool> DeleteAsync(UsersToProjects entity)
        {
            using var db = new SqlConnection(connectionString);

            return await db.DeleteAsync(entity);
        }
    }
}
