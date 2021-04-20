using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> GetByEmailAsync(string email);

        public Task<User> GetByEmailAndPasswordAsync(string email, string password);

        public Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId);

        public Task<int> InsertAsync(User user);
    }
}
