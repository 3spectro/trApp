using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IAuthQueries
  {

    Task<IApiResponse<LoginResponse>> Login(LoquinRequest request);

    bool ValidateToken(string tokenString);
  }
}
