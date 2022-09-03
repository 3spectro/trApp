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
  }
}
