using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public interface IAuthQueries
  {

    Task<IApiResponse<LoginResponse>> Login(LoginRequest request);

    bool ValidateToken(string tokenString);
  }
}
