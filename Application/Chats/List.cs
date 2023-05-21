using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats;

public class List
{
    public class Query : IRequest<List<ChatDto>>
    {
        
    }
    
    public class Handler : IRequestHandler<Query, List<ChatDto>>
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
        
        public async Task<List<ChatDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            // var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            Console.WriteLine("Current username {0}", _userAccessor.GetUsername());
            var userChats = await _context.UserChats.Where(x => x.User.UserName == _userAccessor.GetUsername())
                .Include(x => x.Chat)
                .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return userChats;
        }
    }
}