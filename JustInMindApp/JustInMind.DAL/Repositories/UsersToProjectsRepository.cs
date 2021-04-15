﻿using Dapper.Contrib.Extensions;

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

        public async Task<int> InsertAsync(UsersToProjects entity)
        {

            using var db = new SqlConnection(connectionString);

            var id = await db.InsertAsync(entity);

            return id;
        }
    }
}
