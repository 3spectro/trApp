using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrApi.Models
{
  public class LoginRequest
  {

    public string Username { get; set; }
    public string Password { get; set; }

  }

  public class LoginResponse
  {
    // public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Token { get; set; }
  }

  public class UserModel : IModel
  {
    public string Username { get; set; }
    public string Password
    {
      get; set;
    }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Emial { get; set; }

    static public explicit operator UserEntity(UserModel value)
    {
      return new UserEntity
      {
        Username = value.Username,
        Password = value.Password,
        FirstName = value.FirstName,
        LastName = value.LastName,
        Emial = value.Emial,
      };
    }
  }

  public class UserEntity : IEntity
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string Username { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(max)")]
    public string Password { get; set; 
    }
    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string FirstName { get; set; }
    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string LastName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string Emial { get; set; }

    public virtual ICollection<ApplicationEntity> Applications { get; set; }
  }
}
