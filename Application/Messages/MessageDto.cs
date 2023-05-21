namespace Application.Message;

public class MessageDto
{
    public Guid Id { get; set; }
    public string AuthorDisplayName { get; set; }
    public string AuthorUsername { get; set; }
    public string ChatId { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; }
}