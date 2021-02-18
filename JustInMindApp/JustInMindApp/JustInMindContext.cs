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
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-8M7HAO3\\SQLEXPRESS;Database=JustInMind;Trusted_Connection=True;");
            }
        }
    }
}
