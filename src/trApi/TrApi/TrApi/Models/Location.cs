using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TrApi.Models
{
  public class LocationEntity : IEntity
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string? Country { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    [Precision(12, 10)]
    public decimal Latitude { get; set; }

    [Required]
    [Precision(12, 10)]
    public decimal Length { get; set; }
  }

  public class LocationModel : IModel
  {
    public int Id { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public decimal Latitude { get; set; }
    public decimal Length { get; set; }
  }
}
