namespace JustInMind.Shared.Requests
{
    public class AddUserAsColaboratorRequset
    {
        public string UserEmail { get; set; }

        public int UserRoleId { get; set; }

        public int ProjectId { get; set; }
    }
}
