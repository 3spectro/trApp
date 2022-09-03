using AutoMapper;

namespace TrApi.Queries.Interfaces
{
  public abstract class BaseQuery
  {

    public readonly IMapper _mapper;
    public readonly DataContext _context;

    public BaseQuery(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

  }
}
