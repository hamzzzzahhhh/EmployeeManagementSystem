using EmployeeAttendanceSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeManagement.DataRepo
{
    public class AttendanceConfiguration : IEntityTypeConfiguration<Attendance>
    {
        public AttendanceConfiguration() { }
        public void Configure(EntityTypeBuilder<Attendance> builder)
        {
            builder.HasKey(x => x.AttendanceId);
            builder.HasOne(e => e.Employee).WithMany(e => e.Attendances).HasForeignKey(e => e.EmployeeId);

            builder.HasCheckConstraint("CK_CheckInTime_CheckOutTime", "CheckInTime < CheckOutTime");

            builder.HasIndex(e => new { e.EmployeeId, e.Date }).IsUnique();
        }
    }
}
