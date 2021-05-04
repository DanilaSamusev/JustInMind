using JustInMind.BLL.Interfaces;
using JustInMind.DAL.Interfaces;
using JustInMind.Shared.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace JustInMind.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<User> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _userRepository.GetByEmailAndPasswordAsync(email, password);
        }

        public async Task<IEnumerable<UserColaboration>> GetAllColaboratorsByProjectIdAsync(int projectId)
        {
            return await _userRepository.GetAllColaboratorsByProjectIdAsync(projectId);
        }

        public async Task<int> InsertAsync(User user)
        {
            return await _userRepository.InsertAsync(user);
        }
    }
}
