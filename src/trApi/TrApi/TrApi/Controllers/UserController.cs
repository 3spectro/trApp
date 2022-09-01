using Microsoft.AspNetCore.Mvc;
using TrApi.Models;
using TrApi.Queries.Interfaces;

namespace TrApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {

    private readonly IUserQueries _queries;

    public UserController(IUserQueries queries)
    {
      _queries = queries;
    }

    // GET: api/<UserController>
    [HttpGet]
    public Task<IApiResponse<IEnumerable<UserModel>>> Get()
    {
      return _queries.GetAllAsync();
    }

    // POST api/<UserController>
    [HttpPost]
    public Task<IApiResponse<int>> Post([FromBody] UserModel value)
    {
      return _queries.InsertAsync((UserEntity)value);
    }

    // PUT api/<UserController>/5
    [HttpPut]
    public Task<IApiResponse<bool>> Put([FromBody] UserModel value)
    {
      // return _queries.UpdateAsync(value.id (User)value);
      return null;
    }

    // DELETE api/<UserController>/5
    [HttpDelete("{id}")]
    public Task<IApiResponse<bool>> Delete(int id)
    {
      return _queries.DeleteAsync(id);
    }
  }
}
