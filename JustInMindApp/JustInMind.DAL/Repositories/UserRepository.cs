using Dapper;

using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JustInMind.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly string connectionString;

        public UserRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId)
        {
            string sql = "SELECT UserId as 'Id', u.Name, 'Smith' as 'Surname', r.Name as 'Role', 'someMail@mail.ru' as 'Email' " +
                            "FROM UsersToProjects up " +
                            "LEFT JOIN Users u ON u.Id = up.UserId " +
                            "LEFT JOIN Roles r ON up.UserRoleId = r.Id " +
                            $"WHERE up.ProjectId = {projectId} AND " +
                            "r.Name != 'Owner'";
            
            using var db = new SqlConnection(connectionString);
            
            var users = await db.QueryAsync<UserColaboration>(sql);

            return users;
        }
    }
}
