using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TrApi.Models;
using TrApi.Queries.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  // [Authorize]
  public class ApplicationsController : ControllerBase
  {

    private readonly IApplicationQueries _applicationQueries;

    public ApplicationsController(IApplicationQueries applicationQueries)
    {
      this._applicationQueries = applicationQueries;
    }

    [HttpGet]
    public Task<IApiResponse<IEnumerable<ApplicationModel>>> Get()
    {
      return _applicationQueries.GetAllAsync();
    }

    [HttpPost]
    public Task<IApiResponse<int>> Post([FromBody] ApplicationModel value)
    {
      return _applicationQueries.InsertAsync((ApplicationEntity)value);
    }

    [HttpPut]
    public Task<IApiResponse<int>> Put([FromBody] ApplicationModel value)
    {
      return _applicationQueries.UpdateAsync(value.Id, (ApplicationEntity)value);
    }

    [HttpPost("delete")]
    public Task<IApiResponse<bool>> Delete([FromBody] int id)
    {
      return _applicationQueries.DeleteAsync(id);
    }
  }
}
