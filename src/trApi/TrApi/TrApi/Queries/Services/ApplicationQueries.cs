using System;
using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class ApplicationQueries : IApplicationQueries
  {

    private readonly DataContext _context;

    public ApplicationQueries(DataContext context)
    {
      this._context = context;
    }

    public async Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      var entity = _context.Applications.Where(app => app.Id == id).First();
      var res = IApiResponse<bool>.GetDefault(Actions.DELETE);
      if (entity != null)
      {
        _context.Applications.Remove(entity);
        await _context.SaveChangesAsync();
      }
      else
        res.SetNotFound();
      return res;
    }

    public async Task<IApiResponse<IEnumerable<ApplicationModel>>> GetAllAsync()
    {
      var res = IApiResponse<IEnumerable<ApplicationModel>>.GetDefault(Actions.GET);
      var list = await _context.Applications.Where(x => x.UserId == 3).ToListAsync();
      res.Value = (IEnumerable<ApplicationModel>)list;
      return res;
    }

    public async Task<IApiResponse<int>> InsertAsync(ApplicationEntity entity)
    {
      try
      {
        var items = await _context.Applications.Where(item => item.UserId == 3).ToListAsync();
        var resp = IsValidModel(items, entity, Actions.CREATE);
        if (resp.Status == resp.StatusOk)
        {
          // TODO: PUT THE USER ID GETTING FROM CLAIMS
          entity.UserId = 3;
          var insert = _context.Applications.Add(entity);
          await _context.SaveChangesAsync();
          var app = insert.Entity;
          resp.Value = app.Id;
        }
        return resp;
      }
      catch (Exception ex)
      {
        string text = ex.Message;
        throw ex;
      }
    }

    public async Task<IApiResponse<int>> UpdateAsync(int id, ApplicationEntity entity)
    {
      try
      {
        var items = await _context.Applications.Where(item => item.UserId == 3 && item.Id != id).ToListAsync();
        var resp = IsValidModel(items, entity, Actions.UPDATE);
        if (resp.Status == resp.StatusOk)
        {
          var existintItem = await _context.Applications.FirstAsync(x => x.Id == id);
          if (existintItem != null)
          {
            existintItem.Url = entity.Url;
            existintItem.Name = entity.Name;
            await _context.SaveChangesAsync();
          }
          else
            resp.SetNotFound();
        }
        return resp;
      }
      catch (Exception ex)
      {
        string text = ex.Message;
        throw ex;
      }
    }

    private static IApiResponse<int> IsValidModel(List<ApplicationEntity> items, ApplicationEntity model, Actions action)
    {
      var res = IApiResponse<int>.GetDefault(action);
      var isInvalidModel = items.Where(app => app.Name == model.Name).Any();
      if (isInvalidModel)
      {
        res = new IApiResponse<int>
        {
          Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
          Message = new FieldMessage("name", "There is already an application with the same name"),
          Value = 0
        };
      } else
      {
        isInvalidModel = items.Where(app => app.Url == model.Url).Count() > 0;
        if (isInvalidModel)
        {
          res = new IApiResponse<int>
          {
            Status = (int)ResponseStatus.ERROR_ENTITY_VALIDATION,
            Message = new FieldMessage("url", "There is already an application with the same url"),
            Value = 0
          };
        }
      }
      return res;
    }
  }
}
