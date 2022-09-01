using TrApi.Enums;
using TrApi.Generics;
using TrApi.Models;

namespace TrApi.Queries.Interfaces
{
  public class IApiResponse<T>
  {
    public int Status { get; set; }
    public int? StatusOk { get; set; }
    public FieldMessage? Message { get; set; }
    public T? Value { get; set; }

    public static IApiResponse<T> GetDefault(Actions action)
    {
      var resp = new IApiResponse<T>();
      switch (action)
      {
        case Actions.CREATE:
        case Actions.UPDATE:
          resp.Status = (int)ResponseStatus.CREATE;
          break;
        case Actions.GET:
          resp.Status = (int)ResponseStatus.OK;
          break;
        case Actions.DELETE:
          resp.Status = (int)ResponseStatus.OK;
          break;
      }
      resp.StatusOk = resp.Status;
      return resp;
    }

    public void SetNotFound()
    {
      Status = (int)ResponseStatus.ERROR_NOT_FOUND;
      Message = new FieldMessage(String.Empty, GenericMessages.ERROR_NOT_FOUND);
    }
  }
}