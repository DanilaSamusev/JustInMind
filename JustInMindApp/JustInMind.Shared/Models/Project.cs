using System.ComponentModel.DataAnnotations;

namespace JustInMind.Shared.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
