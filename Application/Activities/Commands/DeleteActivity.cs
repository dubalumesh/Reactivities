using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext appDbContext) : IRequestHandler<Command>
        {

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await appDbContext.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }
                appDbContext.Activities.Remove(activity);
                await appDbContext.SaveChangesAsync(cancellationToken);

            }


        }
    }
}
