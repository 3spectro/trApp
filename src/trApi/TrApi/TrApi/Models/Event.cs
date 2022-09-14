using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
  public class EventEntity : IEntity
  {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int JourneyId { get; set; }
    [ForeignKey("JourneyId")]
    public virtual JourneyEntity? Journey { get; set; }

    [Required]
    public string? Type { get; set; }

    [Required]
    public int ApplicationId { get; set; }
    [ForeignKey("ApplicationId")]
    public virtual ApplicationEntity? Application { get; set; }

    [Required]
    public DateTime? DateFrom { get; set; }

    [Required]
    public DateTime? DateTo { get; set; }

    [Required]
    [Precision(6, 2)]
    public decimal Price { get; set; }

    [Required]
    public string? ReservationCode { get; set; }
  }

  public class EventModel : IModel
  {
    public int Id { get; set; }
    public int JourneyId { get; set; }
    public string? Type { get; set; }
    public int ApplicationId { get; set; }
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
    public decimal Price { get; set; }
    public string? ReservationCode { get; set; }

    static public explicit operator EventEntity(EventModel value)
    {
      return new EventEntity
      {
        JourneyId = value.JourneyId,
        Type = value.Type,
        ApplicationId = value.ApplicationId,
        DateFrom = value.DateFrom,
        DateTo = value.DateTo,
        Price = value.Price,
        ReservationCode = value.ReservationCode,
      };
    }
  }

  public class EventQueryModel 
  {
    public int Id { get; set; }
    public int Type { get; set; }
    public string? SubType { get; set; }
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
    public decimal Price { get; set; }
    public string? Application { get; set; }
    public string? ReservationCode { get; set; }
  }
}
