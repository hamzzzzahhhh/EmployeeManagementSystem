using EmployeeAttendanceSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeManagement.DataRepo
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee> 
    {
        public EmployeeConfiguration() { }
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(x => x.EmployeeId);
            builder.Property(b => b.Name).HasMaxLength(50).IsRequired();

            builder.Property(e => e.Email).IsRequired();

            builder.HasIndex(x => x.EmployeeId).IsUnique();

            builder.HasCheckConstraint("CK_Email_Valid", "Email LIKE '%@%' AND Email LIKE '%.%'");
        }
    }
}
