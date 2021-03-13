using Microsoft.IdentityModel.Tokens;

using System.Text;

namespace JustInMindApp
{
    public class AuthOptions
    {
        public const string Issuer = "MyAuthServer";
        public const string Audience = "MyAuthClient";
        const string Key = "mysupersecret_secretkey!123";
        public const int LifeTime = 1;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
