using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Message;

public class Create
{
    public class Command : IRequest<MessageDto>
    {
        public string Body { get; set; }
        public Guid ChatId { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, MessageDto>
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
        
        public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var chat = await _context.Chats.FindAsync(request.ChatId);
            if (chat == null) return null;
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            var message = new Domain.Message()
            {
                Author = user,
                Body = request.Body,
                Chat = chat,
                CreatedAt = DateTime.UtcNow
            };

            chat.Messages.Add(message);
            await _context.SaveChangesAsync();
            return _mapper.Map<MessageDto>(message);
        }
    }
}