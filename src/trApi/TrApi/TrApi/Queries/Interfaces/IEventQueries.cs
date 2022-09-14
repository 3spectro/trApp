using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IEventQueries : IQueries<EventModel, EventEntity>
  {

    Task<IApiResponse<IEnumerable<EventQueryModel>>> GetQueryAsync(int journeyId);

  }
}
