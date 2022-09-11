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

  public class TravelEntity : IEntity
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int EventId { get; set; }
    [ForeignKey("EventId")]
    public virtual EventEntity? Event { get; set; }

    [Required]
    public string? WayToTravel { get; set; }

    [Required]
    public int DepartureId { get; set; }
    [ForeignKey("DepartureId")]
    public virtual LocationEntity? Departure { get; set; }

    [Required]
    public int ArriveId { get; set; }
    [ForeignKey("ArriveId")]
    public virtual LocationEntity? Arrive { get; set; }
    public int? Duration { get; set; }
  }
}
