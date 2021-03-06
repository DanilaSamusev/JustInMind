﻿using System.ComponentModel.DataAnnotations;

namespace JustInMind.Shared.Requests
{ 
    public class SignUpRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
