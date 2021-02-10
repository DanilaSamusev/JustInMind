using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class Task
    {
        public Task()
        {
            Attachements = new HashSet<Attachement>();
            Comments = new HashSet<Comment>();
            Feedbacks = new HashSet<Feedback>();
            Histories = new HashSet<History>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UrgencyId { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public int StateId { get; set; }

        public virtual Category Category { get; set; }
        public virtual State State { get; set; }
        public virtual Urgency Urgency { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Attachement> Attachements { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<History> Histories { get; set; }
    }
}
