using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public class IApiResponse<T>
  {
    public int Status { get; set; }
    public FieldMessage? Message { get; set; }
    public T? Value { get; set; }

    public static IApiResponse<int> GetDefault()
    {
      return new IApiResponse<int>
      {
        Status = 501,
        Message = null,
        Value = 0
      };
    }

  }
}
