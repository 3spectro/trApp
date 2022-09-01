using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IQueries<T, D> where T : IModel where D : IEntity
  {

    Task<IApiResponse<IEnumerable<T>>> GetAllAsync();

    Task<IApiResponse<int>> InsertAsync(D entity);

    Task<IApiResponse<int>> UpdateAsync(int id, D enity);

    Task<IApiResponse<bool>> DeleteAsync(int id);
  }
}
