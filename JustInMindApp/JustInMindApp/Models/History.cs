using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class History
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public virtual Task Task { get; set; }
    }
}
