using Labatt.Core.WebApi;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ProjectTemplate.Tests.Controllers;

public class BaseControllerTests
{
    private protected WebApplicationFactory<Program> Application { get; private set; }
    protected HttpClient Client { get; private set; }

    [SetUp]
    public void BaseSetUp()
    {
        Application = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.Configure<LabattMiddlewareOptions>(options =>
                    {
                        options.DisableAuthenticationMiddleware = true;
                    });

                    // Replace any services here
                });
            });

        Client = Application.CreateClient();
    }

    [TearDown]
    public void BaseTearDown()
    {
        Application.Dispose();
        Application = null;
        Client.Dispose();
        Client = null;
    }
}
