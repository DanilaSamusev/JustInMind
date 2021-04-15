using JustInMind.Shared.Requests;

using JustInMindApp.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace JustInMindApp.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JustInMindContext dbContext;

        public AccountController()
        {
            dbContext = new JustInMindContext();
        }

        [HttpPost("signUp")]
        public IActionResult SignUp([FromBody] SignUpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest();
            }

            var user = new User
            {
                Name = request.Name,
                Password = request.Password,
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return Ok();
        }

        [HttpPost("token")]
        public IActionResult Token([FromBody] UserLogin userLogin)
        {
            var identity = GetIdentity(userLogin);

            if (identity == null)
            {
                return BadRequest(new { ErrorMessage = "Invalid username or password!" });
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

        [HttpGet()]
        [Authorize]
        public IActionResult Authorized()
        {
            return Ok();
        }

        private ClaimsIdentity GetIdentity(UserLogin userLogin)
        {
            var user = dbContext.Users
                .FirstOrDefault(u => u.Name == userLogin.Name && u.Password == userLogin.Password);

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
