using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats;

public class Details
{
    public class Query : IRequest<DetailedChatDto>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, DetailedChatDto>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<DetailedChatDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var chat = await _context.Chats
                .Include(x => x.Messages)
                .Include(x => x.UserChats)
                .ThenInclude(x => x.User)
                .ProjectTo<DetailedChatDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            chat.Messages = chat.Messages.OrderBy(x => x.CreatedAt).ToList();

            return chat;
        }
    }
}