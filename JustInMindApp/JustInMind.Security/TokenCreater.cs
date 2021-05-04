using JustInMind.Shared.Models;

using JustInMindApp.Security;

using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.ObjectModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JustInMind.Security
{
    public class TokenCreater
    {
        public static JwtSecurityToken CreateToken(User user)
        {
            var userIdentity = GetIdentity(user);

            var currentDate = DateTime.UtcNow;

            var token = new JwtSecurityToken(
                    issuer: TokenOptions.Issuer,
                    audience: TokenOptions.Audience,
                    notBefore: currentDate,
                    claims: userIdentity.Claims,
                    expires: currentDate.Add(TimeSpan.FromMinutes(TokenOptions.LifeTime)),
                    signingCredentials: new SigningCredentials(TokenOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return token;
        }

        private static ClaimsIdentity GetIdentity(User user)
        {
            var claims = new Collection<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                    new Claim(nameof(User.Id).ToLower(), user.Id.ToString()),
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
