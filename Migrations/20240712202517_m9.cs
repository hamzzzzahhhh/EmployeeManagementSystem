using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManagement.Migrations
{
    public partial class m9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeId",
                table: "Employees",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Employees_CK_Email_Valid",
                table: "Employees",
                sql: "Email LIKE '%@%' AND Email LIKE '%.%'");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeId",
                table: "Employees");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Employees_CK_Email_Valid",
                table: "Employees");
        }
    }
}
