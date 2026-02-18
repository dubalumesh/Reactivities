
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>>
    {
    }

    public class Handler(AppDbContext appDbContext) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {

            return await appDbContext.Activities.ToListAsync(cancellationToken);
        }
    }
}