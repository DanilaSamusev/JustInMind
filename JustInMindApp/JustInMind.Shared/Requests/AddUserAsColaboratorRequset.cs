namespace JustInMind.Shared.Requests
{
    public class AddUserAsColaboratorRequset
    {
        public string UserName { get; set; }

        public int UserRoleId { get; set; }

        public int ProjectId { get; set; }
    }
}
