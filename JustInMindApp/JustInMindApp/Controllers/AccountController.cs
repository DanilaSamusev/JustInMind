using JustInMind.BLL.Interfaces;
using JustInMind.Security;
using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using Microsoft.AspNetCore.Mvc;

using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequest request)
        {
            var user = _userService.GetByEmailAsync(request.Email);

            if (user != null)
            {
                return BadRequest("User already exists!");
            }

            var newUser = new User
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = request.Email,
                Password = request.Password,
            };

            await _userService.InsertAsync(newUser);

            return Ok();
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
        {
            var user = await _userService.GetByEmailAndPasswordAsync(request.Email, request.Password);

            if (user == null)
            {
                return NotFound("User is not found!");
            }

            var token = TokenCreater.CreateToken(user);

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            var response = new
            {
                token = encodedToken,
                userName = token.Claims.FirstOrDefault(c => c.Type == ClaimsIdentity.DefaultNameClaimType).Value,
                userId = token.Claims.FirstOrDefault(c => c.Type == nameof(JustInMind.Shared.Models.User.Id).ToLower()).Value,
            };

            return new ObjectResult(response);
        }
    }
}
