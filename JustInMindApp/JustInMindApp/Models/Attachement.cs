using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class Attachement
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public int TaskId { get; set; }

        public virtual Task Task { get; set; }
    }
}
