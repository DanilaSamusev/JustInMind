using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JustInMind.Shared.Models
{
    [Table("UsersToProjects")]
    public class UsersToProjects
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int UserId { get; set; }

        public int UserRoleId { get; set; }
    }
}
