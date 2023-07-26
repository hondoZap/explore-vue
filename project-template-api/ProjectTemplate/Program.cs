using Labatt.Core.Security;
using Labatt.Core.WebApi.Extensions;
using Microsoft.EntityFrameworkCore;
using ProjectTemplate.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.AddLabatt();

builder.Services.AddLabatt();

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

builder.Services.AddHealthChecks()
    .AddDbContextMigrationCheck<ProjectTemplateContext>();

var app = builder.Build();
app.UseLabatt();
app.MapGet("/login", ctx => { ctx.Response.Redirect("/"); return Task.CompletedTask; });

app.Run();
