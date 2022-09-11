using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrApi.Models
{
  public class ApplicationEntity : IEntity
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? Name{ get; set; }

    [Required]
    [Column(TypeName = "nvarchar(100)")]
    public string? Url { get; set; }

    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual UserEntity User { get; set; }

  }

  public class ApplicationModel : IModel
  {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Url { get; set; }

    static public explicit operator ApplicationEntity(ApplicationModel value)
    {
      return new ApplicationEntity
      {
        Name = value.Name,
        Url = value.Url,
      };
    }
  }
}
