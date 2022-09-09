using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrApi.Migrations
{
    public partial class AddJourneysAndEventsInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JourneyEntityId",
                table: "Guests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Journeys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Journeys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Journeys_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JourneyEntityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Journeys_JourneyEntityId",
                        column: x => x.JourneyEntityId,
                        principalTable: "Journeys",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Guests_JourneyEntityId",
                table: "Guests",
                column: "JourneyEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_JourneyEntityId",
                table: "Events",
                column: "JourneyEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Journeys_UserId",
                table: "Journeys",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Journeys_JourneyEntityId",
                table: "Guests",
                column: "JourneyEntityId",
                principalTable: "Journeys",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Journeys_JourneyEntityId",
                table: "Guests");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Journeys");

            migrationBuilder.DropIndex(
                name: "IX_Guests_JourneyEntityId",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "JourneyEntityId",
                table: "Guests");
        }
    }
}
