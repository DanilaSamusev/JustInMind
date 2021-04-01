using System.ComponentModel.DataAnnotations.Schema;

namespace JustInMindApp.Models
{
    public partial class User
    {
        public int Id { get; set; }
        [Column("Name")]
        public string UserName { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public Role Role { get; set; }
    }
}
