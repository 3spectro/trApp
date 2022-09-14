using AutoMapper;
using TrApi.Models;

namespace TrApi.IoC
{
  public class AutoMapperProfile : Profile
  {

    public AutoMapperProfile()
    {
      CreateMap<ApplicationEntity, ApplicationModel>();
      CreateMap<GuestEntity, GuestModel>();
      CreateMap<UserEntity, UserModel>();
      CreateMap<JourneyEntity, JourneyModel>();
      CreateMap<EventEntity, EventModel>();
      CreateMap<LocationEntity, LocationModel>();
    }
  }
}
