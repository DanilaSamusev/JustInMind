using JustInMind.Shared.Models;

using JustInMindApp.Models;

using Microsoft.EntityFrameworkCore;

namespace JustInMindApp
{
    public partial class JustInMindContext : DbContext
    {
        public JustInMindContext()
        {
        }

        public JustInMindContext(DbContextOptions<JustInMindContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Attachement> Attachements { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<History> Histories { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Urgency> Urgencies { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<UsersToProjects> UsersToProjects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:justinmind.database.windows.net,1433;Initial Catalog=JustInMindDB;Persist Security Info=False;User ID=user;Password=one@3456;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }
    }
}
