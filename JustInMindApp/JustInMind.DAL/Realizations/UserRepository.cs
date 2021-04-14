using Dapper;

using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JustInMind.DAL.Realizations
{
    public class UserRepository : IUserRepository
    {
        private const string ConnectionString = "Server=DESKTOP-8M7HAO3\\SQLEXPRESS;Database=JustInMindDB;Trusted_Connection=True;";

        public async Task<IEnumerable<UserColaboration>> GetAllUserColaborationsByProjectIdAsync(int projectId)
        {
            string query = "SELECT UserId as 'Id', u.Name, 'Smith' as 'Surname', r.Name as 'Role', 'someMail@mail.ru' as 'Email' " +
                            "FROM UsersToProjects up " +
                            "LEFT JOIN Users u ON u.Id = up.UserId " +
                            "LEFT JOIN Roles r ON u.RoleId = r.Id " +
                            $"WHERE up.ProjectId = {projectId}";
            
            using var db = new SqlConnection(ConnectionString);
            
            var users = await db.QueryAsync<UserColaboration>(query);

            return users;
        }
    }
}
