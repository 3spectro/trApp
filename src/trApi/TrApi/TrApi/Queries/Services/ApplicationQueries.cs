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

    public async Task<IApiResponse<IEnumerable<Application>>> GetAllAsync()
    {
      var res = new IApiResponse<IEnumerable<Application>>
      {
        Status = 200,
        Message = null,
        Value = await _context.Applications.ToListAsync()
      };
      return res;
    }

    public async Task<IApiResponse<int>> Insert(Application model)
    {
      try
      {
        var resp = this.isValidModel(model);
        if (resp.Status == 201)
        {
          var insert = _context.Applications.Add(model);
          await _context.SaveChangesAsync();
          var app = insert.Entity;
          resp.Value = app.Id;
        }
        return resp;
      }
      catch(Exception ex)
      {
        string text = ex.Message;
        throw ex;
      }
    }

    public async Task<IApiResponse<bool>> Update(Application model)
    {
      try
      {
        IApiResponse<bool> res;
        var isValidModel = (await _context.Applications
                            .Where(app => app.Id != model.Id &&
                                          (app.Name.ToString().ToLower() == model.Name.ToString().ToLower() ||
                                           app.Url.ToString().ToLower() == model.Url.ToString().ToLower())).ToListAsync()).Count() > 0;
        if (isValidModel)
        {
          res = new IApiResponse<bool>
          {
            Status = 422,
            Message = null,// "There is already an application with the same name or url",
            Value = false
          };
        }
        else
        {
          var insert = _context.Applications.Add(model);
          await _context.SaveChangesAsync();
          var app = insert.Entity;

          res = new IApiResponse<bool>
          {
            Status = 201,
            Message = null,
            Value = true
          };
        }
        return res;
      }
      catch (Exception ex)
      {
        string text = ex.Message;
        throw ex;
      }
    }

    public async Task<IApiResponse<bool>> Delete(int id)
    {
      var entity = _context.Applications.Where(app => app.Id == id).FirstOrDefault();
      _context.Applications.Remove(entity);
      await _context.SaveChangesAsync();
      return new IApiResponse<bool>
      {
        Status = 201,
        Message = null,
        Value = true
      };
    }


    private IApiResponse<int> isValidModel(Application model)
    {
      var items = _context.Applications.ToList();
      var res = IApiResponse<int>.GetDefault();
      var isInvalidModel = items.Where(app => app.Name == model.Name).Count() > 0;
      if (isInvalidModel)
      {
        res = new IApiResponse<int>
        {
          Status = 422,
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
            Status = 422,
            Message = new FieldMessage("url", "There is already an application with the same url"),
            Value = 0
          };
        }
      }

      return res;
    }

  }
}
