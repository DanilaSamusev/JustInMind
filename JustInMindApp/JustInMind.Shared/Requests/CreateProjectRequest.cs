﻿namespace JustInMind.Shared.Requests
{
    public class CreateProjectRequest
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int OwnerId { get; set; }
    }
}
