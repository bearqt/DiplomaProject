using System.Collections;
using Application.Message;
using AutoMapper;

namespace Application.Chats;

public class DetailedChatDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public bool IsPrivate { get; set; }
    public string? AdminUsername { get; set; }
    public string? Photo { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<MessageDto>? Messages { get; set; } = new List<MessageDto>();

    public ICollection<UserChatDto>? Members { get; set; } = new List<UserChatDto>();
    
}