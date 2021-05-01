using Dapper;
using Dapper.Contrib.Extensions;

using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustInMind.DAL.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly string _connectionString;

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<Shared.Models.Task> GetSingleByIdAsync(int id)
        {
            string sql = "SELECT * FROM Tasks " +
                         $"WHERE Id = @Id";

            using var db = new SqlConnection(_connectionString);

            return await db.QueryFirstOrDefaultAsync<Shared.Models.Task>(sql, new { Id = id });
        }

        public async Task<IEnumerable<Shared.Models.Task>> GetAllByProjectIdAsync(int projectId)
        {
            string sql = "SELECT * FROM Tasks " +
                         $"WHERE ProjectId = @ProjectId";

            using var db = new SqlConnection(_connectionString);

            var tasks = await db.QueryAsync<Shared.Models.Task>(sql, new { ProjectId = projectId });

            return tasks;
        }

        //TODO: Make in better with Dapper tools
        public async Task<DetailedTask> GetDetailedTaskByIdAsync(int taskId)
        {
            using var db = new SqlConnection(_connectionString);

            string sqlTask = "SELECT * " +
                             "FROM Tasks " +
                             $"WHERE Id = @TaskId";

            var task = await db.QueryFirstOrDefaultAsync<DetailedTask>(sqlTask, new { TaskId = taskId});

            string sqlUser = "SELECT * " +
                             "FROM Users " +
                             "WHERE Id = @UserId";

            var user = await db.QueryFirstOrDefaultAsync<User>(sqlUser, new { UserId = task.UserId});

            string sqlComments = "SELECT * " +
                                 "FROM Comments " +
                                 "WHERE UserId = @UserId AND TaskId = @TaskId";

            var comments = await db.QueryAsync<Comment>(sqlComments, new { UserId = task.UserId, TaskId = task.Id });

            task.User = user;
            task.Comments = comments;

            return task;
        }

        public async Task<int> InsertAsync(Shared.Models.Task entity)
        {
            using var db = new SqlConnection(_connectionString);

            return await db.InsertAsync(entity);
        }

        public async Task<bool> UpdateAsync(Shared.Models.Task entity)
        {
            using var db = new SqlConnection(_connectionString);

            return await db.UpdateAsync(entity);
        }

        public async Task<bool> DeleteAsync(Shared.Models.Task entity)
        {
            using var db = new SqlConnection(_connectionString);

            return await db.DeleteAsync(entity);
        }
    }
}
