using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrApi.Migrations
{
    public partial class Travels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Travels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    WayToTravel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartureId = table.Column<int>(type: "int", nullable: false),
                    ArriveId = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Travels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Travels_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Travels_Locations_ArriveId",
                        column: x => x.ArriveId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Travels_Locations_DepartureId",
                        column: x => x.DepartureId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Travels_ArriveId",
                table: "Travels",
                column: "ArriveId");

            migrationBuilder.CreateIndex(
                name: "IX_Travels_DepartureId",
                table: "Travels",
                column: "DepartureId");

            migrationBuilder.CreateIndex(
                name: "IX_Travels_EventId",
                table: "Travels",
                column: "EventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Travels");
        }
    }
}
