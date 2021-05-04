using System.Collections.Generic;

namespace JustInMind.Shared.Models
{
    public class DetailedTask
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UrgencyId { get; set; }

        public int CategoryId { get; set; }

        public int UserId { get; set; }

        public int StateId { get; set; }

        public int ProjectId { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

        public User User { get; set; }

    }
}
