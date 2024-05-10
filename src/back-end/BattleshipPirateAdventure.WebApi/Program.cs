using Microsoft.WindowsAzure.Storage;
using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.EntityFrameworkCore;
using BattleshipPirateAdventure.SQLStorage.Models;
using BattleshipPirateAdventure.SQLStorage.QueryHandlers;
using BattleshipPirateAdventure.SQLStorage.CommandHandlers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped(sp =>
{
    var storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
    return storageAccount.CreateCloudTableClient();
});
builder.Services.AddScoped<ITableStorageService, TableStorageService>();

builder.Services.AddDbContext<BattleshipContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("battleship"));
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetUserQueryHandler).Assembly));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateUserCommandHandler).Assembly));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

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

app.UseCors();

app.MapControllers();

app.Run();


