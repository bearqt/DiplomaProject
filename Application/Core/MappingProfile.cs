using Application.Chats;
using Application.Message;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Domain.Message, MessageDto>()
            .ForMember(d => d.AuthorDisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.ChatId, o => o.MapFrom(s => s.Chat.Id));
        CreateMap<Chat, ChatDto>()
            .ForMember(d => d.LastMessageBody, o => o.MapFrom(s => s.Messages.FirstOrDefault().Body));
        
        
        CreateMap<UserChat, UserChatDto>()
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName));
        CreateMap<Chat, DetailedChatDto>()
            .ForMember(d => d.AdminUsername,
                o =>
                    o.MapFrom(s => s.UserChats.FirstOrDefault(x => x.IsAdmin).User.UserName))
            .ForMember(d => d.Members, o => o.MapFrom(s => s.UserChats))
            ;

        CreateMap<UserChat, Profiles.Profile>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));

        CreateMap<UserChat, ChatDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Chat.Id))
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Chat.Title))
            .ForMember(d => d.LastMessageBody, o => o.MapFrom(s => s.Chat.Messages.FirstOrDefault().Body));
        CreateMap<AppUser, Profiles.Profile>();
    }
}   