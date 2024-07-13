using System.ComponentModel.DataAnnotations;

namespace EmployeeAttendanceSystem.Models
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }

        [MinLength(2)]
        public string Name { get; set; }

        public string? Department { get; set; }

        public string Email { get; set; }

        public List<Attendance>? Attendances { get; set; }
    }
}
