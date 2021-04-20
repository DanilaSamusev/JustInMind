using Dapper;
using Dapper.Contrib.Extensions;

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

        public async Task<User> GetByEmailAsync(string email)
        {
            string sql = "SELECT * FROM Users " +
                         "WHERE Email = @Email";

            using var db = new SqlConnection(connectionString);

            return await db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User> GetByEmailAndPasswordAsync(string email, string password)
        {
            string sql = "SELECT * FROM Users " +
                         "WHERE Email = @Email AND Password = @Password";

            using var db = new SqlConnection(connectionString);

            return await db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email, Password = password });
        }

        public async Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId)
        {
            string sql = "SELECT UserId as 'Id', u.Name, 'Smith' as 'Surname', r.Name as 'Role', 'someMail@mail.ru' as 'Email' " +
                            "FROM UsersToProjects up " +
                            "LEFT JOIN Users u ON u.Id = up.UserId " +
                            "LEFT JOIN Roles r ON up.UserRoleId = r.Id " +
                            $"WHERE up.ProjectId = @ProjectId AND " +
                            "r.Name != 'Owner'";

            using var db = new SqlConnection(connectionString);

            return await db.QueryAsync<UserColaboration>(sql, new { ProjectId = projectId });
        }

        public async Task<int> InsertAsync(User user)
        {
            using var db = new SqlConnection(connectionString);

            return await db.InsertAsync(user);
        }
    }
}
