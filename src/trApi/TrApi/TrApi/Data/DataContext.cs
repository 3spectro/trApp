using Microsoft.EntityFrameworkCore;
using TrApi.Models;

namespace TrApi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Application> Applications { get; set; }
  }
}
