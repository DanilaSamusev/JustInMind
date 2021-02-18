namespace JustInMindApp.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }
    }
}
