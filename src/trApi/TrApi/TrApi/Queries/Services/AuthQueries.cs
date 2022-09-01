using System.Security.Claims;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class AuthQueries : IAuthQueries
  {

    private const string symmetricKey = "625A5CB11391BD1ED231179C7D3476EB959B5293AD017832D236D307AD9085F6";
    private readonly DataContext _context;
    private readonly IEncrypt _encrypt;

    public AuthQueries(DataContext context, IEncrypt encrypt)
    {
      _context = context;
      _encrypt = encrypt;
    }

    public async Task<IApiResponse<LoginResponse>> Login(LoginRequest request)
    {
      var user = await _context.Users.Where(user => user.Username == request.Username && user.Password == _encrypt.GetEncryptedWord(request.Password)).FirstOrDefaultAsync();
      var resp = new LoginResponse();
      if (user != null)
      {
        var token = this.Generate(request.Username);
        resp = new LoginResponse
        {
          FirstName = user.FirstName,
          LastName = user.LastName,
          Token =  token
        };
      }
      return new IApiResponse<LoginResponse>
      {
        Status = 200,
        Message = null, //isValid ? string.Empty : "User or password incorrect",
        Value = user != null ? resp : null,
      };
    }

    public bool ValidateToken(string tokenString)
    {
      var clientSecret = System.Text.Encoding.ASCII.GetBytes(symmetricKey);
      var signingKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(clientSecret);

      var tokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
      {
        //jwt from DealerPortal doesn't currently set issuer or audience claims so we are unable to validate them
        ValidateIssuer = false,
        ValidateAudience = false,

        //jwt should be signed and signed by the same key used in DealerPortal (which EPC stores in config)
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = signingKey,
        RequireSignedTokens = true,

        //jwt should have an expiration and not be expired
        ValidateLifetime = true,
        RequireExpirationTime = true
      };

      try
      {
        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var mainClaim = handler.ValidateToken(tokenString, tokenValidationParameters, out _);
        return true;
      }
      catch (Microsoft.IdentityModel.Tokens.SecurityTokenValidationException stvex)
      {
        //token failed validation
        // _logger.Warning($"Token failed validation: {stvex.Message}");
        return false;
      }
      catch (ArgumentException argex)
      {
        //token was not well-formed or was invalid for some other reason.
        // _logger.Warning($"Token was invalid: {argex.Message}");
        return false;
      }
      catch (Exception ex)
      {
        // _logger.Error($"Error validating token: {ex}");
        return false;
      }
    }

    private string Generate(string userName)
    {
      // generate token that is valid for 7 days
      var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
      var key = System.Text.Encoding.ASCII.GetBytes(symmetricKey); ;
      var subject = GetClaimIdentityFromUser(userName);
      var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
      {
        Subject = subject,
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials =
            new Microsoft.IdentityModel.Tokens.SigningCredentials(
              new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
              Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    private ClaimsIdentity GetClaimIdentityFromUser(string userName)
    {
      var claim = new ClaimsIdentity();
      claim.AddClaim(new Claim("unique_name", userName));
      return claim;
    }

  }
}
