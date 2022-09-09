using Microsoft.AspNetCore.Mvc;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  // [Authorize]
  public class JourneysController : ControllerBase
  {
    private readonly IJourneyQueries _queries;

    public JourneysController(IJourneyQueries queries)
    {
      _queries = queries;
    }

    [HttpGet]
    public Task<IApiResponse<IEnumerable<JourneyModel>>> Get()
    {
      return _queries.GetAllAsync();
    }

    [HttpPost]
    public Task<IApiResponse<int>> Post([FromBody] JourneyModel value)
    {
      return _queries.InsertAsync((JourneyEntity)value);
    }

    [HttpPut]
    public Task<IApiResponse<int>> Put([FromBody] JourneyModel value)
    {
      return _queries.UpdateAsync(value.Id.Value, (JourneyEntity)value);
    }

    [HttpPost("delete")]
    public Task<IApiResponse<bool>> Delete([FromBody] int id)
    {
      return _queries.DeleteAsync(id);
    }
  }
}
