global using Microsoft.EntityFrameworkCore;
global using TrApi.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using TrApi.IoC;
using TrApi.Queries.Interfaces;
using TrApi.Queries.Services;
using TrApi.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Add ContextModel
builder.Services.AddDbContext<DataContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConection"));
});

// Add BasicAuthentication
builder.Services.AddAuthentication("BasicAuthentication")
  .AddScheme<AuthenticationSchemeOptions, AuthHandler>("BasicAuthentication", null);

// Add services
builder.Services.AddScoped<IEncrypt, Encrypt>();
builder.Services.AddScoped<IApplicationQueries, ApplicationQueries>();
builder.Services.AddScoped<IAuthQueries, AuthQueries>();
builder.Services.AddScoped<IGuestQueries, GuestQueries>();
builder.Services.AddScoped<IUserQueries, UserQueries>();
builder.Services.AddScoped<IJourneyQueries, JourneyQueries>();
builder.Services.AddScoped<IEventQueries, EventQueries>();
builder.Services.AddScoped<IAccomodationQueries, AccomodationQueries>();

builder.Services.AddCors(actions => actions.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var config = new MapperConfiguration(cfg =>
{
  cfg.AddProfile(new AutoMapperProfile());
});
var mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
