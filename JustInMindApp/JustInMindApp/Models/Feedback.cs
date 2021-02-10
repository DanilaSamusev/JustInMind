﻿using System;
using System.Collections.Generic;

#nullable disable

namespace JustInMindApp.Models
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public int? Rate { get; set; }
        public string Text { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public virtual Task Task { get; set; }
    }
}
