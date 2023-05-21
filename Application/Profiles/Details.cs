using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Details
{
    public class Query : IRequest<Profile>
    {
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Profile>
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
        
        public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Username == request.Username);
            return user;
        }
    }
}