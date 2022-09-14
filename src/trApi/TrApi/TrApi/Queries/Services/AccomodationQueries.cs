using AutoMapper;
using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Queries.Services
{
  public class AccomodationQueries : BaseQuery, IAccomodationQueries
  {

    public AccomodationQueries(DataContext context, IMapper mapper)
  : base(context, mapper)
    { }

    public Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      throw new NotImplementedException();
    }

    public Task<IApiResponse<IEnumerable<AccomodationModel>>> GetAllAsync()
    {
      throw new NotImplementedException();
    }

    public async Task<IApiResponse<int>> InsertAsync(AccomodationEntity entity)
    {
      /*var items = await _context.Events.Where(item => item.JourneyId == entity.).ToListAsync();
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
      return resp;*/
      throw new NotImplementedException();
    }

    public Task<IApiResponse<int>> UpdateAsync(int id, AccomodationEntity enity)
    {
      throw new NotImplementedException();
    }
  }
}
