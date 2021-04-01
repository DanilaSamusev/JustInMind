namespace JustInMindApp.Models
{
    public class UsersToProjects
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int CollaboratorId { get; set; }

        public int CollaboratorRoleId { get; set; }
    }
}
