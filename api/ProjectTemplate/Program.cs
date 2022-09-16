using Labatt.Core.Security;
using Labatt.Core.WebApi.Extensions;
using Microsoft.EntityFrameworkCore;
using ProjectTemplate.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.AddLabatt();
builder.Services.AddHealthChecks();

builder.Services.AddDbContext<ProjectTemplateContext>((services, options) =>
{
    Labatt.Core.Configuration.IConfigurationSource config = services.GetRequiredService<Labatt.Core.Configuration.IConfigurationSource>();
    var connString = config.GetDbConnectionString("mariadb");
    options.UseMySql(connString, ServerVersion.Parse("MariaDB 10.5"), opts =>
    {
        opts.EnableRetryOnFailure(maxRetryCount: 3);
    });
});

builder.Services.Configure<LabattAuthorizationServiceOptions>(options =>
{
    options.EnableAutoRbacPrefixes = true;
});

var app = builder.Build();
app.UseLabatt();
app.MapGet("/login", ctx => { ctx.Response.Redirect("/"); return Task.CompletedTask; });
app.UseHealthChecks("/meta/status");

app.Run();

public partial class Program { }
