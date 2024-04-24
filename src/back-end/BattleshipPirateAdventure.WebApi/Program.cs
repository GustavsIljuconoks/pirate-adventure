using Microsoft.Extensions.Azure;
using BattleshipPirateAdventure.WebApi.Features.Auth.Models;
using Microsoft.WindowsAzure.Storage;
using Azure.Core.Pipeline;

var builder = WebApplication.CreateBuilder(args);

// Setup Azurite use
builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddBlobServiceClient(builder.Configuration["admiring_blackburn:blob"]);
    clientBuilder.AddQueueServiceClient(builder.Configuration["admiring_blackburn:queue"]);
});

builder.Services.AddScoped(sp =>
{
    var storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
    return storageAccount.CreateCloudTableClient();
});
builder.Services.AddScoped<ITableStorageService, TableStorageService>();

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


