using AutoMapper;
using TrApi.Enums;
using TrApi.Models;
using TrApi.Queries.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace TrApi.Queries.Services
{
  public class EventQueries : BaseQuery, IEventQueries
  {

    public EventQueries(DataContext context, IMapper mapper)
  : base(context, mapper)
    { }

    public Task<IApiResponse<bool>> DeleteAsync(int id)
    {
      throw new NotImplementedException();
    }

    public Task<IApiResponse<IEnumerable<EventModel>>> GetAllAsync()
    {
      throw new NotImplementedException();
    }

    public Task<IApiResponse<int>> InsertAsync(EventEntity entity)
    {
      throw new NotImplementedException();
    }

    public Task<IApiResponse<int>> UpdateAsync(int id, EventEntity enity)
    {
      throw new NotImplementedException();
    }

    public async Task<IApiResponse<IEnumerable<EventQueryModel>>> GetQueryAsync(int journeyId)
    {
      var travels = from e in this._context.Events
                  join travel in this._context.Travels on e equals travel.Event
                  select new EventQueryModel
                  {
                    Id = travel.Id,
                    Type = -1,
                    SubType = string.Empty,
                    DateFrom = e.DateFrom,
                    DateTo = e.DateTo,
                    Price = e.Price,
                    Application = e.Application.Name,
                    ReservationCode = e.ReservationCode
                  };
      var resp = IApiResponse<IEnumerable<EventQueryModel>>.GetDefault(Actions.GET);
      resp.Value = await travels.ToListAsync();

      var accomodations = from e in this._context.Events
                          join accomodation in this._context.Accomodations on e equals accomodation.Event
                          select new EventQueryModel
                          {
                            Id = accomodation.Id,
                            Type = -1,
                            SubType = string.Empty,
                            DateFrom = e.DateFrom,
                            DateTo = e.DateTo,
                            Price = e.Price,
                            Application = e.Application.Name,
                            ReservationCode = e.ReservationCode
                          };

      // resp.Value.Append(await accomodations.ToListAsync());

      return resp;
     }
  }
}
