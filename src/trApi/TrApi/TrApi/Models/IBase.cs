namespace TrApi.Models
{
  public abstract class IModel
  {
  }

  public abstract class IEntity
  {
  }

  public class FieldMessage
  {
    public string Field { get; set; } = string.Empty; 
    public string Message { get; set; } = string.Empty;

    public FieldMessage(string field, string message)
    {
      Field = field;
      Message = message;
    }
  }
}
