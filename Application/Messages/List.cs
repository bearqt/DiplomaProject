using Application.Message;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages;

public class List
{
    public class Query : IRequest<List<MessageDto>>
    {
        public Guid ChatId { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, List<MessageDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<List<MessageDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var messages = await _context.Messages
                .Where(x => x.Chat.Id == request.ChatId)
                .OrderBy(x => x.CreatedAt)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return messages;
        }
    }
}