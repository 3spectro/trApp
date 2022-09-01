using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class GuestQueries : IGuestQueries
  {

    private readonly DataContext _context;

    public GuestQueries(DataContext context)
    {
      _context = context;
    }

    public async Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      var entity = _context.Guests.Where(app => app.Id == id).First();
      var res = IApiResponse<bool>.GetDefault(Actions.DELETE);
      if (entity != null)
      {
        _context.Guests.Remove(entity);
        await _context.SaveChangesAsync();
      }
      else
        res.SetNotFound();
      return res;
    }

    public async Task<IApiResponse<IEnumerable<GuestModel>>> GetAllAsync()
    {
      var res = IApiResponse<IEnumerable<GuestModel>>.GetDefault(Actions.GET);
      res.Value = (IEnumerable<GuestModel>)await _context.Guests.Where(x => x.UserId == 3).ToListAsync();
      return res;
    }

    public async Task<IApiResponse<int>> InsertAsync(GuestEntity entity)
    {
      var items = await _context.Guests.Where(item => item.UserId == 3).ToListAsync();
      var resp = IsValidModel(items, entity, Actions.CREATE);
      if (resp.Status == resp.StatusOk)
      {
        entity.UserId = 3;
        var insert = _context.Guests.Add(entity);
        await _context.SaveChangesAsync();
        var app = insert.Entity;
        resp.Value = app.Id;
      }
      return resp;
    }

    public async Task<IApiResponse<int>> UpdateAsync(int id, GuestEntity entity)
    {
      var items = await _context.Guests.Where(item => item.UserId == 3 && item.Id != id).ToListAsync();
      var resp = IsValidModel(items, entity, Actions.UPDATE);
      if (resp.Status == resp.StatusOk)
      {
        var existintItem = await _context.Guests.FirstAsync(x => x.Id == id);
        if (existintItem != null)
        {
          existintItem.FirstName = entity.FirstName;
          existintItem.LastName = entity.LastName;
          existintItem.Passport = entity.Passport;
          existintItem.Email = entity.Email;
          existintItem.Phone = entity.Phone;
          await _context.SaveChangesAsync();
        }
        else
          resp.SetNotFound();
      }
      return resp;
    }

    private static IApiResponse<int> IsValidModel(List<GuestEntity> items, GuestEntity entity, Actions action)
    {
      var res = IApiResponse<int>.GetDefault(action);
      var isInvalidModel = items.Where(app => app.Passport == entity.Passport).Any();
      if (isInvalidModel)
      {
        res = new IApiResponse<int>
        {
          Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
          Message = new FieldMessage("passport", "There is already a guest with the same passport"),
          Value = 0
        };
      }
      else
      {
        isInvalidModel = items.Where(app => app.Email == entity.Email).Count() > 0;
        if (isInvalidModel)
        {
          res = new IApiResponse<int>
          {
            Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
            Message = new FieldMessage("email", "There is already a guest with the same email"),
            Value = 0
          };
        }
      }
      return res;
    }
  }
}
