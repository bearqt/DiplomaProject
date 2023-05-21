namespace Domain;

public class UserChat
{
    public string AppUserId { get; set; }
    public AppUser User { get; set; }

    public Guid ChatId { get; set; }
    public Chat Chat { get; set; }
    public bool IsAdmin { get; set; }
}