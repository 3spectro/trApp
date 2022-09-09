﻿using Microsoft.EntityFrameworkCore;
using TrApi.Models;

namespace TrApi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ApplicationEntity> Applications { get; set; }
    public DbSet<GuestEntity> Guests { get; set; }
    public DbSet<JourneyEntity> Journeys { get; set; }
    public DbSet<EventEntity> Events { get; set; }

  }
}
