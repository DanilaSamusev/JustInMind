using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<UserColaboration>> GetAllUserColaborationsByProjectIdAsync(int projectId);
    }
}
