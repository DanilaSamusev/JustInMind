using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetByEmailAsync(string email);

        public Task<User> GetByEmailAndPasswordAsync(string email, string password);

        public Task<int> InsertAsync(User user);

        public Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId);
    }
}
