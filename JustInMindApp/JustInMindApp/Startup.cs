using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using JustInMind.DAL.Interfaces;
using JustInMind.DAL.Repositories;
using JustInMind.BLL.Interfaces;
using JustInMind.BLL.Services;
using JustInMindApp.Security;

namespace JustInMindApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = TokenOptions.Issuer, 
                            ValidAudience = TokenOptions.Audience,
                            IssuerSigningKey = TokenOptions.GetSymmetricSecurityKey(),
                        };
                    });

            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var connectionStrings = Configuration.GetSection("ConnectionStrings");
            string connectionString = connectionStrings.GetSection("LocalConnection").Value;

            services.AddTransient<IUserRepository>(r => new UserRepository(connectionString));
            services.AddTransient<IProjectRepository>(r => new ProjectRepository(connectionString));
            services.AddTransient<IUsersToProjectsRepository>(r => new UsersToProjectsRepository(connectionString));
            services.AddTransient<ITaskRepository>(r => new TaskRepository(connectionString));

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IProjectService, ProjectService>();
            services.AddTransient<IUsersToProjectsService, UsersToProjectsService>();
            services.AddTransient<ITaskService, TaskService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
        
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
