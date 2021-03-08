using System.Collections.Generic;

namespace JustInMindApp.Models
{
    public partial class Task
    {        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
        public State State { get; set; }
        public Urgency Urgency { get; set; }
        public List<Comment> Comments { get; set; }
        public Category Category { get; set; }
    }
}
