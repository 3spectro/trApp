using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
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

  public class TravelModel : IModel
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
