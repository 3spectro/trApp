using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrApi.Models;
using TrApi.Queries.Interfaces;
using TrApi.Queries.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  // [Authorize]
  public class GuestsController : ControllerBase
  {

    private readonly IGuestQueries _queries;

    public GuestsController(IGuestQueries queries)
    {
      _queries = queries;
    }

    [HttpGet]
    public Task<IApiResponse<IEnumerable<GuestModel>>> Get()
    {
      return _queries.GetAllAsync();
    }

    [HttpPost]
    public Task<IApiResponse<int>> Post([FromBody] GuestModel value)
    {
      return _queries.InsertAsync((GuestEntity)value);
    }

    [HttpPut]
    public Task<IApiResponse<int>> Put([FromBody] GuestModel value)
    {
      return _queries.UpdateAsync(value.Id.Value, (GuestEntity)value);
    }

    [HttpPost("delete")]
    public Task<IApiResponse<bool>> Delete([FromBody] int id)
    {
      return _queries.DeleteAsync(id);
    }
  }
}
