using AutoMapper;
using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class JourneyQueries : BaseQuery, IJourneyQueries
  {
    public JourneyQueries(DataContext context, IMapper mapper)
  : base(context, mapper)
    { }

    public async Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      var entity = _context.Journeys.Where(x => x.Id == id).First();
      var res = IApiResponse<bool>.GetDefault(Actions.DELETE);
      if (entity != null)
      {
        _context.Journeys.Remove(entity);
        await _context.SaveChangesAsync();
      }
      else
        res.SetNotFound();
      return res;
    }

    public async Task<IApiResponse<IEnumerable<JourneyModel>>> GetAllAsync()
    {
      var res = IApiResponse<IEnumerable<JourneyModel>>.GetDefault(Actions.GET);
      var list = await _context.Journeys.ToListAsync();
      res.Value = _mapper.Map<IEnumerable<JourneyModel>>(list);
      return res;
    }

    public async Task<IApiResponse<IEnumerable<JourneyModel>>> GetByUser(int userId)
    {
      var res = IApiResponse<IEnumerable<JourneyModel>>.GetDefault(Actions.GET);
      var list = await _context.Journeys.Where(x => x.UserId == userId).ToListAsync();
      res.Value = _mapper.Map<IEnumerable<JourneyModel>>(list);
      return res;
    }

    public async Task<IApiResponse<int>> InsertAsync(JourneyEntity entity)
    {
      try
      {
        var items = await _context.Journeys.Where(item => item.UserId == 3).ToListAsync();
        var resp = IsValidModel(items, entity, Actions.CREATE);
        if (resp.Status == resp.StatusOk)
        {
          // TODO: PUT THE USER ID GETTING FROM CLAIMS
          entity.UserId = 3;
          var guestIds = entity.Guests.Select(x => x.Id);
          var guests = (ICollection<GuestEntity>)_context.Guests.Where(x => guestIds.Contains(x.Id)).ToList();          
          entity.Guests = guests;
          var insert = _context.Journeys.Add(entity);
          await _context.SaveChangesAsync();
          var app = insert.Entity;
          resp.Value = app.Id;
        }
        return resp;
      }
      catch (Exception ex)
      {
        var message = ex.Message;
        throw ex;
      }
      
    }

    public async Task<IApiResponse<int>> UpdateAsync(int id, JourneyEntity entity)
    {
      var items = await _context.Journeys.Where(item => item.UserId == 3 && item.Id != id).ToListAsync();
      var resp = IsValidModel(items, entity, Actions.UPDATE);
      if (resp.Status == resp.StatusOk)
      {
        var existintItem = await _context.Journeys.FirstAsync(x => x.Id == id);
        if (existintItem != null)
        {
          existintItem.Name = entity.Name;
          existintItem.StartDate = entity.StartDate;
          existintItem.EndDate = entity.EndDate;
          await _context.SaveChangesAsync();
        }
        else
          resp.SetNotFound();
      }
      return resp;
    }

    private static IApiResponse<int> IsValidModel(List<JourneyEntity> items, JourneyEntity model, Actions action)
    {
      var res = IApiResponse<int>.GetDefault(action);
      var isInvalidModel = items.Where(item => item.Name == model.Name).Any();
      if (isInvalidModel)
        res.SetErrorEntityValidation("name", "There is already a journey with the same name");
      else
      {
        isInvalidModel = items.Where(item => (item.StartDate <= model.StartDate && item.EndDate > model.StartDate) ||
                                             (item.EndDate <= model.EndDate && item.EndDate > model.EndDate) ||
                                             (item.StartDate >= model.StartDate && item.EndDate <= model.EndDate)).Count() > 0;
        if (isInvalidModel)
          res.SetErrorEntityValidation("name", "There is already a journey on the same dates");
      }
      return res;
    }
  }
}
