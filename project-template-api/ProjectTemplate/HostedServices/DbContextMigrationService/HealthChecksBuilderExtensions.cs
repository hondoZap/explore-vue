using Labatt.Core.HostedServices.DbContextMigrationService;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection;

public static class HealthChecksBuilderExtensions
{
    public static IHealthChecksBuilder AddDbContextMigrationCheck<TDbContext>(this IHealthChecksBuilder builder) where TDbContext : DbContext
    {
        builder.Services.AddOptions<DbContextMigrationServiceOptions>().BindConfiguration("Migrations");
        builder.Services
            .AddSingleton<DbContextMigrationService<TDbContext>>()
            .AddTransient<IHostedService>(s => s.GetRequiredService<DbContextMigrationService<TDbContext>>());
        builder.AddCheck<DbContextMigrationService<TDbContext>>($"DbContext migrations for {typeof(TDbContext).Name}");

        return builder;
    }
}
