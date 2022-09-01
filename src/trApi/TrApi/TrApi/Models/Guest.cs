using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
  public class GuestEntity : IEntity
  {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string FirstName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string LastName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(9)")]
    public string Passport { get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public string? Email { get; set; }

    [Column(TypeName = "nvarchar(15)")]
    public string? Phone { get; set; }

    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual UserEntity User { get; set; }

  }

  public class GuestModel : IModel
  {
    public int? Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Passport { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }

    static public explicit operator GuestEntity(GuestModel value)
    {
      return new GuestEntity
      {
        FirstName = value.FirstName,
        LastName = value.LastName,
        Passport = value.Passport,
        Email = value.Email,
        Phone = value.Phone,
      };
    }
  }
}
