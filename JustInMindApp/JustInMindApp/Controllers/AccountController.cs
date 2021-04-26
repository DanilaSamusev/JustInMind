using JustInMind.BLL.Interfaces;
using JustInMind.Shared.Models;
using JustInMind.Shared.Requests;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.Generic;
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
        public IActionResult SignUp([FromBody] SignUpRequest request)
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

            _userService.InsertAsync(newUser);

            return Ok();
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> GetTokenAsync([FromBody] SignInRequest request)
        {
            var identity = await GetIdentityAsync(request);

            if (identity == null)
            {
                ModelState.AddModelError("SignIn", "Invalid username or password!");
                return BadRequest(ModelState);
            }

            var currentDate = DateTime.UtcNow;

            var token = new JwtSecurityToken(
                    issuer: AuthOptions.Issuer,
                    audience: AuthOptions.Audience,
                    notBefore: currentDate,
                    claims: identity.Claims,
                    expires: currentDate.Add(TimeSpan.FromMinutes(AuthOptions.LifeTime)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            var response = new
            {
                token = encodedToken,
                userName = token.Claims.ToList()[0].Value,
                userId = token.Claims.ToList()[1].Value,
            };

            return new ObjectResult(response);
        }

        private async Task<ClaimsIdentity> GetIdentityAsync(SignInRequest request)
        {
            var user = await _userService.GetByEmailAndPasswordAsync(request.Email, request.Password);

            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                    new Claim("userId", user.Id.ToString()),
                };

            var claimsIdentity = new ClaimsIdentity(
                    claims,
                    "Token",
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType
                );

            return claimsIdentity;
        }
    }
}
