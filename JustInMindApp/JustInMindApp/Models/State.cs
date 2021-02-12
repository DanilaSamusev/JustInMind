using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class State
    {
        public State()
        {
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
