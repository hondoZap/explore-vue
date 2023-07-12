namespace Labatt.Core.HostedServices.DbContextMigrationService;

public class DbContextMigrationServiceOptions
{
    public int RetryAttempts { get; set; } = 3;
}
