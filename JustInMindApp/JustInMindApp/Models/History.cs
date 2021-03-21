namespace JustInMindApp.Models
{
    public class History
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }
    }
}
