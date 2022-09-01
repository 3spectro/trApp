using System.Text;
using TrApi.Queries.Interfaces;
using System.Security.Cryptography;

namespace TrApi.Queries.Services
{
  public class Encrypt : IEncrypt
  {
    public string GetEncryptedWord(string toEncrypt)
    {
      var sha256 = SHA256.Create();
      var encoding = new ASCIIEncoding();
      var sb = new StringBuilder();
      var stream = sha256.ComputeHash(encoding.GetBytes(toEncrypt));
      for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
      return sb.ToString();
    }
  }
}
