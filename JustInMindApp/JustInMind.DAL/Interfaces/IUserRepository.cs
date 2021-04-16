using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.DAL.Interfaces
{
    public interface IUserRepository
    {
        public Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId);
    }
}
