namespace Domain;

public class Message
{
    public Guid Id { get; set; }
    public AppUser Author { get; set; }
    public Chat Chat { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; }
} 