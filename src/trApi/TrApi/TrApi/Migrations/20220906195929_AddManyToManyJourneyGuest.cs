using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrApi.Migrations
{
    public partial class AddManyToManyJourneyGuest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Journeys_JourneyEntityId",
                table: "Guests");

            migrationBuilder.DropForeignKey(
                name: "FK_Journeys_Users_UserId",
                table: "Journeys");

            migrationBuilder.DropIndex(
                name: "IX_Guests_JourneyEntityId",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "JourneyEntityId",
                table: "Guests");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Journeys",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "GuestEntityJourneyEntity",
                columns: table => new
                {
                    GuestsId = table.Column<int>(type: "int", nullable: false),
                    JourneysId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestEntityJourneyEntity", x => new { x.GuestsId, x.JourneysId });
                    table.ForeignKey(
                        name: "FK_GuestEntityJourneyEntity_Guests_GuestsId",
                        column: x => x.GuestsId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuestEntityJourneyEntity_Journeys_JourneysId",
                        column: x => x.JourneysId,
                        principalTable: "Journeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GuestEntityJourneyEntity_JourneysId",
                table: "GuestEntityJourneyEntity",
                column: "JourneysId");

            migrationBuilder.AddForeignKey(
                name: "FK_Journeys_Users_UserId",
                table: "Journeys",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Journeys_Users_UserId",
                table: "Journeys");

            migrationBuilder.DropTable(
                name: "GuestEntityJourneyEntity");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Journeys",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JourneyEntityId",
                table: "Guests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Guests_JourneyEntityId",
                table: "Guests",
                column: "JourneyEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Journeys_JourneyEntityId",
                table: "Guests",
                column: "JourneyEntityId",
                principalTable: "Journeys",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Journeys_Users_UserId",
                table: "Journeys",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
