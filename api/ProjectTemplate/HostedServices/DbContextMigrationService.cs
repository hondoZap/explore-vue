using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;

namespace Labatt.Core.HostedServices.DbContextMigrationService;

public class DbContextMigrationService<TDbContext> : BackgroundService, IHealthCheck where TDbContext : DbContext
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IHostApplicationLifetime _applicationLifetime;
    private readonly ILogger _logger;
    private readonly IOptions<DbContextMigrationServiceOptions> _options;

    private bool _migrationsHaveRun;

    public DbContextMigrationService(IServiceScopeFactory scopeFactory, IHostApplicationLifetime applicationLifetime, ILogger<DbContextMigrationService<TDbContext>> logger, IOptions<DbContextMigrationServiceOptions> options)
    {
        _scopeFactory = scopeFactory;
        _applicationLifetime = applicationLifetime;
        _logger = logger;
        _options = options;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var previousAttempts = 0;
        var rnd = new Random();

        while (!_migrationsHaveRun)
        {
            try
            {
                _logger.LogInformation("Attempting to run migrations");
                using (IServiceScope scope = _scopeFactory.CreateScope())
                {
                    TDbContext ctx = scope.ServiceProvider.GetRequiredService<TDbContext>();
                    await ctx.Database.MigrateAsync(stoppingToken);
                }
                _logger.LogInformation("Successfully ran migrations");
                _migrationsHaveRun = true;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogDebug(ex, "execution canceled");
                return;
            }
            catch (Exception ex) when (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogError(ex, "Migrations failed");
                if (previousAttempts >= _options.Value.RetryAttempts)
                {
                    _logger.LogCritical(ex, "Migrations failed too many times - stopping application");
                    _applicationLifetime.StopApplication();
                    return;
                }

                var sleepDuration = TimeSpan.FromSeconds(rnd.NextDouble() * Math.Pow(2, previousAttempts));
                _logger.LogInformation(ex, "Sleeping {sleepSeconds} seconds before retrying", sleepDuration.TotalSeconds);
                await Task.Delay(sleepDuration);
            }

            previousAttempts++;
        }
    }

    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(_migrationsHaveRun
            ? new HealthCheckResult(HealthStatus.Healthy)
            : new HealthCheckResult(HealthStatus.Unhealthy, $"migrations have not yet run"));
    }
}
