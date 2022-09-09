using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IJourneyQueries : IQueries<JourneyModel, JourneyEntity>
  {
    Task<IApiResponse<IEnumerable<JourneyModel>>> GetByUser(int userId);
  }
}
