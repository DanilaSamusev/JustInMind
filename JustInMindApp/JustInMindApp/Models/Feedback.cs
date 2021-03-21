namespace JustInMindApp.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int? Rate { get; set; }
        public string Text { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }
    }
}
