using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TrApi.Models;
using TrApi.Queries.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class ApplicationsController : ControllerBase
  {

    private readonly IApplicationQueries _applicationQueries;

    public ApplicationsController(IApplicationQueries applicationQueries)
    {
      this._applicationQueries = applicationQueries;
    }

    [HttpGet]
    public Task<IApiResponse<IEnumerable<Application>>> Get()
    {
      return _applicationQueries.GetAllAsync();
    }

    [HttpPost]
    public Task<IApiResponse<int>> Post([FromBody] Application value)
    {
      return _applicationQueries.Insert(value);
    }

    [HttpPut]
    public Task<IApiResponse<bool>> Put([FromBody] Application value)
    {
      return _applicationQueries.Update(value);
    }

    // DELETE api/<ApplicationsController>/5
    [HttpDelete("{id}")]
    public Task<IApiResponse<bool>> Delete(int id)
    {
      return _applicationQueries.Delete(id);
    }
  }
}
