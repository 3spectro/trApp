using AutoMapper;
using TrApi.Models;

namespace TrApi.IoC
{
  public class AutoMapperProfile : Profile
  {

    public AutoMapperProfile()
    {
      CreateMap<ApplicationEntity, ApplicationModel>().ReverseMap(); //reverse so the both direction
    }
  }
}
