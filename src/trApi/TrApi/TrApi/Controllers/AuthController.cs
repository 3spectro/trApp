using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    private const string symmetricKey = "625A5CB11391BD1ED231179C7D3476EB959B5293AD017832D236D307AD9085F6";
    private readonly IAuthQueries _service;

    public AuthController(IAuthQueries service)
    {
      this._service = service;
    }

    [Route("login")]
    [HttpPost]
    public Task<IApiResponse<LoginResponse>> Login([FromBody] LoquinRequest user)
    {
      return this._service.Login(user);
    }


    [Route("validate")]
    [HttpGet]
    public bool Validate()
    {
      if (!Request.Headers.ContainsKey("Authorization")) return false;
      var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
      /*var creadentialsByte = Convert.FromBase64String(authHeader.Parameter);
      var token = Encoding.UTF8.GetString(creadentialsByte);*/
      return this._service.ValidateToken(authHeader.Parameter);
    }
  }
}
