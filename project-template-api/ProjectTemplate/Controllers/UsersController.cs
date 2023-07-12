using Labatt.Core.Security;
using Labatt.Core.WebApi;
using Labatt.Core.WebApi.Security;
using Microsoft.AspNetCore.Mvc;
using ProjectTemplate.Domain;
using System.Reflection;

namespace ProjectTemplate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    public class CurrentUserView
    {
        public string ID { get; init; }
        public string FullName { get; init; }
        public Dictionary<string, bool> Permissions { get; init; }
    }

    [Authorize(Permission.View)]
    [HttpGet("current")]
    public async Task<CurrentUserView> GetCurrentUserAsync([FromServices] IAuthenticatedUserAccessor authenticatedUserAccessor,
                                                           [FromServices] IAuthorizationService authService,
                                                           CancellationToken cancellationToken)
    {
        var user = authenticatedUserAccessor.User();

        var permissionNameDict = typeof(Permission).GetFields(BindingFlags.Public | BindingFlags.Static)
                     .Where(field => field.FieldType == typeof(string))
                     .ToDictionary(field => field.Name, field => field.GetValue(null).ToString());

        IReadOnlyDictionary<string, bool> permissionChecksDict =
            await authService.HasAccessAsync(user.ID, permissionNameDict.Values.ToArray(), cancellationToken);

        return new CurrentUserView
        {
            ID = user.ID,
            FullName = user.FullName,
            Permissions = permissionNameDict
                .ToDictionary(kp => kp.Key, kp => permissionChecksDict.GetValueOrDefault(kp.Value, false)),
        };
    }
}
