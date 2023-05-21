using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats;

public class Join
{
    public class Command : IRequest<Unit>
    {
        public Guid ChatId { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }
        
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            var chat = await _context.Chats.FirstOrDefaultAsync(x => x.Id == request.ChatId);

            //Если юзер ужее в этом чате
            if (_context.UserChats.Any(x => x.ChatId == chat.Id && x.AppUserId == user.Id))
            {
                return Unit.Value;
            }

            var userChat = new UserChat()
            {
                User = user,
                Chat = chat
            };

            _context.UserChats.Add(userChat);
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}