using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class AppDbConext : DbContext
    {
        public AppDbConext(DbContextOptions<AppDbConext> options) : base(options)
        {
        }

        public required DbSet<Activity> Activities { get; set; }
    }
}
