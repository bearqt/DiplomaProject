using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Afteranothercrash : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserChatAppUserId",
                table: "UserChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserChatChatId",
                table: "UserChats",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserChats_UserChatAppUserId_UserChatChatId",
                table: "UserChats",
                columns: new[] { "UserChatAppUserId", "UserChatChatId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserChats_UserChats_UserChatAppUserId_UserChatChatId",
                table: "UserChats",
                columns: new[] { "UserChatAppUserId", "UserChatChatId" },
                principalTable: "UserChats",
                principalColumns: new[] { "AppUserId", "ChatId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChats_UserChats_UserChatAppUserId_UserChatChatId",
                table: "UserChats");

            migrationBuilder.DropIndex(
                name: "IX_UserChats_UserChatAppUserId_UserChatChatId",
                table: "UserChats");

            migrationBuilder.DropColumn(
                name: "UserChatAppUserId",
                table: "UserChats");

            migrationBuilder.DropColumn(
                name: "UserChatChatId",
                table: "UserChats");
        }
    }
}
