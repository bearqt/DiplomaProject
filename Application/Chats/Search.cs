using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats;

public class Search
{
    public class Query : IRequest<List<ChatDto>>
    {
        public string ChatName { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, List<ChatDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<List<ChatDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var chats = await _context.Chats
                .Where(x => x.Title.ToLower().Contains(request.ChatName.ToLower()))
                .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return chats;
        }
    }
}