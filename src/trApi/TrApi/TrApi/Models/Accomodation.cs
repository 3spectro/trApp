using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
  public class AccomodationEntity : IEntity
  {

    public AccomodationEntity()
    {
      this.Guests = new HashSet<GuestEntity>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int EventId { get; set; }
    [ForeignKey("EventId")]
    public virtual EventEntity? Event { get; set; }

    [Required]
    public string? Address { get; set; }

    public virtual ICollection<GuestEntity>? Guests { get; set; }

    [Required]
    public int? LocationId { get; set; }
    [ForeignKey("LocationId")]
    public virtual LocationEntity? Location { get; set; }

  }

  public class AccomodationModel : IModel
  {
    public int Id { get; set; }
    public EventModel? Event { get; set; }
    public string? Address { get; set; }
    public IEnumerable<int>? Guests { get; set; }
    public LocationModel? Location { get; set; }

    static public explicit operator AccomodationEntity(AccomodationModel value)
    {
      var guests = new List<GuestEntity>();
      foreach (var item in guests.Select(x => x.Id).ToList())
      {
        var guest = new GuestEntity
        {
          Id = item
        };
        guests.Add(guest);
      }
      return new AccomodationEntity
      {
        Event = (EventEntity)value.Event,
        Address = value.Address,
        Guests = guests,
        Location = (LocationEntity)value.Location
      };
    }
  }
}
