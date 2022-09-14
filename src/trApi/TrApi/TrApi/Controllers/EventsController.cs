using Microsoft.AspNetCore.Mvc;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EventsController : ControllerBase
  {
    private readonly IEventQueries _queries;

    public EventsController(IEventQueries queries)
    {
      this._queries = queries;
    }

    [HttpGet]
    public Task<IApiResponse<IEnumerable<EventModel>>> Get()
    {
      return _queries.GetAllAsync();
    }

    [HttpGet("queries")]
    public Task<IApiResponse<IEnumerable<EventQueryModel>>> GetQueries(int journeyId)
    {
      return _queries.GetQueryAsync(journeyId);
    }

    [HttpPost("accomodation")]
    public Task<IApiResponse<int>> PostAccomodation([FromBody] AccomodationModel value)
    {
      // return _queries.InsertAsync((EventEntity)value);
      return null;
    }

    [HttpPost("travel")]
    public Task<IApiResponse<int>> PostTravek([FromBody] TravelModel value)
    {
      // return _queries.InsertAsync((EventEntity)value);
      return null;
    }

    [HttpPut]
    public Task<IApiResponse<int>> Put([FromBody] EventModel value)
    {
      return _queries.UpdateAsync(value.Id, (EventEntity)value);
    }

    [HttpPost("delete")]
    public Task<IApiResponse<bool>> Delete([FromBody] int id)
    {
      return _queries.DeleteAsync(id);
    }
  }
}
