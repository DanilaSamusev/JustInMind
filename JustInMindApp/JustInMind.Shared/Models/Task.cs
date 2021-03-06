﻿namespace JustInMind.Shared.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UrgencyId { get; set; }

        public int CategoryId { get; set; }

        public int UserId { get; set; }

        public int StateId { get; set; }

        public int ProjectId { get; set; }
    }
}
