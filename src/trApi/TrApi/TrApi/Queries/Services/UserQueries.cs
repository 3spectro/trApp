using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class UserQueries : IUserQueries
  {

    private readonly DataContext _context;
    private readonly IEncrypt _encrypt;

    public UserQueries(DataContext context, IEncrypt encrypt)
    {
      _context = context;
      _encrypt = encrypt;
    }

    public Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      throw new NotImplementedException();
    }

    public Task<IApiResponse<IEnumerable<UserModel>>> GetAllAsync()
    {
      throw new NotImplementedException();
    }

    public async Task<IApiResponse<int>> InsertAsync(UserEntity model)
    {
      var items = await _context.Users.ToListAsync();
      var resp = IsValidModel(items, model, Actions.CREATE);
      if (resp.Status == resp.StatusOk)
      {
        model.Password = _encrypt.GetEncryptedWord(model.Password);
        var insert = _context.Users.Add(model);
        await _context.SaveChangesAsync();
        var app = insert.Entity;
        resp.Value = app.Id;
      }
      return resp;
    }

    public Task<IApiResponse<int>> UpdateAsync(int id, UserEntity model)
    {
      throw new NotImplementedException();
    }

    private static IApiResponse<int> IsValidModel(List<UserEntity> items, UserEntity entity, Actions action)
    {
      var res = IApiResponse<int>.GetDefault(action);
      var isInvalidModel = items.Where(app => app.Username == entity.Username).Any();
      if (isInvalidModel)
      {
        res = new IApiResponse<int>
        {
          Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
          Message = new FieldMessage("username", "There is already an application with the same user"),
          Value = 0
        };
      }
      else
      {
        isInvalidModel = items.Where(app => app.Emial == entity.Emial).Any();
        if (isInvalidModel)
        {
          res = new IApiResponse<int>
          {
            Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
            Message = new FieldMessage("email", "There is already an application with the same email"),
            Value = 0
          };
        }
      }

      return res;
    }
  }
}
