using BattleshipPirateAdventure.WebApi.Infrastructure.Azure;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(x => builder.Configuration.GetConnectionString("admiring_blackburn"));
builder.Services.AddScoped<ITableStorageService, TableStorageService>();
builder.Services.AddScoped<IBlobStorageService, BlobStorageService>();

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

builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddBlobServiceClient(builder.Configuration["admiring_blackburn:blob"]!, preferMsi: true);
    clientBuilder.AddQueueServiceClient(builder.Configuration["admiring_blackburn:queue"]!, preferMsi: true);
});
builder.Services.AddMemoryCache();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var storageService = scope.ServiceProvider.GetRequiredService<ITableStorageService>();
    await storageService.CreateTables();

    var blobService = scope.ServiceProvider.GetRequiredService<IBlobStorageService>();
    await blobService.CreateBlobContainer();
}

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
