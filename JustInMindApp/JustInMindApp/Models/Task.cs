using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class Task
    {        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UrgencyId { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public int StateId { get; set; }    
    }
}
