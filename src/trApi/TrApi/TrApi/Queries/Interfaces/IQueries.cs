using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IQueries<T> where T : IBaseModel
  {

    Task<IApiResponse<IEnumerable<T>>> GetAllAsync();

    Task<IApiResponse<int>> Insert(T model);

    Task<IApiResponse<bool>> Update(T model);

    Task<IApiResponse<bool>> Delete(int id);
  }
}
