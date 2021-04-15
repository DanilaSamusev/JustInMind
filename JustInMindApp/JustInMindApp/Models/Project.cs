using System.ComponentModel.DataAnnotations;

namespace JustInMindApp.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
