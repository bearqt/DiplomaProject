using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public ICollection<Message> Messages { get; set; } = new List<Message>();
    public ICollection<UserChat> UserChats { get; set; } = new List<UserChat>();
}