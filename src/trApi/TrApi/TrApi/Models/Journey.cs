using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
  public class JourneyEntity : IEntity
  {
    public JourneyEntity()
    {
      this.Guests = new HashSet<GuestEntity>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public int? UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual UserEntity? User { get; set; }

    public virtual ICollection<GuestEntity>? Guests { get; set; }
    public virtual ICollection<EventEntity>? Events { get; set; }
  }

  public class JourneyModel : IModel
  {

    public int? Id { get; set; }
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public ICollection<int>? Guests { get; set; }
    // public ICollection<EventEntity>? Events { get; set; }

    static public explicit operator JourneyEntity(JourneyModel value)
    {
      var guests = new List<GuestEntity>();
      foreach (var item in value.Guests)
      {
        var guest = new GuestEntity
        {
          Id = item
        };
        guests.Add(guest);
      }
      guests.Add(new GuestEntity());
      return new JourneyEntity
      {
        Name = value.Name,
        StartDate = value.StartDate,
        EndDate = value.EndDate,
        Guests = guests
      };
    }
  }
}
