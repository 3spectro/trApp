using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using TrApi.Queries.Interfaces;

namespace TrApi.Security
{
  public class AuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
  {

    private readonly IAuthQueries _auth;

    public AuthHandler(
      IOptionsMonitor<AuthenticationSchemeOptions> options,
      ILoggerFactory logger,
      UrlEncoder encoder,
      ISystemClock clock,
      IAuthQueries auth) : base(options, logger, encoder, clock)
    {
      this._auth = auth;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
      if (!Request.Headers.ContainsKey("Authorization"))
        return AuthenticateResult.Fail("You have no authorization for acccessing to this resource");

      try
      {
        var isValid = false;
        var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
        /*var creadentialsByte = Convert.FromBase64String(authHeader.Parameter);
        var token = Encoding.UTF8.GetString(creadentialsByte);*/
        isValid = this._auth.ValidateToken(authHeader.Parameter);
        if (isValid)
        {
          var claims = new Claim[] {
            new Claim(ClaimTypes.NameIdentifier, "id"),
            new Claim(ClaimTypes.Name, "name"),
          };
          var identity = new ClaimsIdentity(claims, Scheme.Name);
          var principal = new ClaimsPrincipal(identity);
          var ticket = new AuthenticationTicket(principal, Scheme.Name);
          return AuthenticateResult.Success(ticket);
        }
        return AuthenticateResult.Fail("You have no authorization for acccessing to this resource");

      }
      catch (Exception ex)
      {
        return AuthenticateResult.Fail("You have no authorization for acccessing to this resource");
      }
    }
  }
}
