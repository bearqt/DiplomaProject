using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Chats;

public class Create
{
    public class Command : IRequest<Unit>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var chat = new Chat()
            {
                Title = request.Title,
                Description = request.Description,
                IsPrivate = request.IsPrivate,
                CreatedAt = DateTime.UtcNow,
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}