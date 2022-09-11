using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IGuestQueries : IQueries<GuestModel, GuestEntity>
  {

    Task<IApiResponse<IEnumerable<GuestModel>>> GetByJourney(int journeyId);

  }
}
