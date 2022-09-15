using Microsoft.EntityFrameworkCore;

namespace ProjectTemplate.Infrastructure;

public class ProjectTemplateContext : DbContext
{
    public ProjectTemplateContext(DbContextOptions<ProjectTemplateContext> options) : base(options) { }
}

