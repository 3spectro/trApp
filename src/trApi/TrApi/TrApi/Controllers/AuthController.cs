using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    private readonly IAuthQueries _service;
    
    public AuthController(IAuthQueries service, IEncrypt encrypt)
    {
      this._service = service;
    }

    [Route("login")]
    [HttpPost]
    public Task<IApiResponse<LoginResponse>> Login([FromBody] LoginRequest user)
    {
      return this._service.Login(user);
    }


    [Route("validate")]
    [HttpGet]
    public bool Validate()
    {
      if (!Request.Headers.ContainsKey("Authorization")) return false;
      var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
      return this._service.ValidateToken(authHeader.Parameter);
    }

    [Route("encrypted/v1")]
    [HttpGet]
    public string GetEncryptedPassV1(string password)
    {
      // var salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
      var sha256 = SHA256.Create();
      var encoding = new ASCIIEncoding();
      byte[] stream = null;
      var sb = new StringBuilder();
      stream = sha256.ComputeHash(encoding.GetBytes(password));
      for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
      return sb.ToString();

    }
  }
}
