namespace TrApi.Models
{
  public class Application : IBaseModel
  {

    public int Id { get; set; }
    public string? Name{ get; set; }
    public string? Url { get; set; }

  }
}
