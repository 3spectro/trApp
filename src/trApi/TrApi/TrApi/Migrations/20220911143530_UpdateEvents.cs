using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrApi.Migrations
{
    public partial class UpdateEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Journeys_JourneyEntityId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_JourneyEntityId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "JourneyEntityId",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateFrom",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTo",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "JourneyId",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Events",
                type: "decimal(6,2)",
                precision: 6,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ReservationCode",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Events_ApplicationId",
                table: "Events",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_JourneyId",
                table: "Events",
                column: "JourneyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Applications_ApplicationId",
                table: "Events",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Journeys_JourneyId",
                table: "Events",
                column: "JourneyId",
                principalTable: "Journeys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Applications_ApplicationId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Journeys_JourneyId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_ApplicationId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_JourneyId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "DateFrom",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "DateTo",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "JourneyId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ReservationCode",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "JourneyEntityId",
                table: "Events",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_JourneyEntityId",
                table: "Events",
                column: "JourneyEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Journeys_JourneyEntityId",
                table: "Events",
                column: "JourneyEntityId",
                principalTable: "Journeys",
                principalColumn: "Id");
        }
    }
}
