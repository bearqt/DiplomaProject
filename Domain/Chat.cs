namespace Domain;

public class Chat
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool IsPrivate { get; set; }
    public string? AdminUsername { get; set; }
    public string? Photo { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public ICollection<Message> Messages { get; set; } = new List<Message>();
    public ICollection<UserChat> UserChats { get; set; } = new List<UserChat>();
}