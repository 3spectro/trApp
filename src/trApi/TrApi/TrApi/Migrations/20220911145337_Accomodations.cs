using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrApi.Migrations
{
    public partial class Accomodations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccomodationEntityId",
                table: "Guests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Accomodations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accomodations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accomodations_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Guests_AccomodationEntityId",
                table: "Guests",
                column: "AccomodationEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Accomodations_LocationId",
                table: "Accomodations",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Accomodations_AccomodationEntityId",
                table: "Guests",
                column: "AccomodationEntityId",
                principalTable: "Accomodations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Accomodations_AccomodationEntityId",
                table: "Guests");

            migrationBuilder.DropTable(
                name: "Accomodations");

            migrationBuilder.DropIndex(
                name: "IX_Guests_AccomodationEntityId",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "AccomodationEntityId",
                table: "Guests");
        }
    }
}
