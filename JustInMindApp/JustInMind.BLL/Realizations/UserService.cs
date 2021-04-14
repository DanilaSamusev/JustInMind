using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Realizations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId)
        {
            return await this.userRepository.GetAllColaboratorsByProjectIdAsync(projectId);
        }
    }
}
