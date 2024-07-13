using EmployeeManagement.DataRepo;
using EmployeeAttendanceSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AttendanceController : ControllerBase
    {
        private readonly AppDBContext dBContext;

        public AttendanceController(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [HttpGet("getattendancedashboard")]
        public IActionResult GetAttendanceDashboard(DateTime selectedDate)
        {
            var attendanceRecords = dBContext.Employees
                .Select(e => new
                {
                    EmployeeName = e.Name,
                    Attendance = dBContext.Attendances
                        .Where(a => a.EmployeeId == e.EmployeeId && a.Date.Date == selectedDate.Date)
                        .Select(a => new
                        {
                            a.CheckInTime,
                            a.CheckOutTime
                        })
                        .FirstOrDefault()
                })
                .ToList()
                .Select(e => new
                {
                    e.EmployeeName,
                    CheckInTime = e.Attendance?.CheckInTime,
                    CheckOutTime = e.Attendance?.CheckOutTime
                });

            return Ok(attendanceRecords);
        }


        [HttpGet("getattendancereports")]
        public IActionResult GetAttendanceReports(DateTime startDate, DateTime endDate, string department)
        {
            endDate = endDate.AddDays(1).AddTicks(-1);

            var attendanceRecords = (from e in dBContext.Employees
                                     join a in dBContext.Attendances
                                     on e.EmployeeId equals a.EmployeeId into ea
                                     from attendance in ea.DefaultIfEmpty()
                                     where e.Department == department && attendance != null && attendance.Date >= startDate && attendance.Date <= endDate
                                     select new
                                     {
                                         EmployeeName = e.Name,
                                         Department = e.Department,
                                         Date = attendance.Date,
                                         CheckInTime = attendance.CheckInTime,
                                         CheckOutTime = attendance.CheckOutTime
                                     })
                                     .ToList();

            return Ok(attendanceRecords);
        }



        [HttpPost("checkin")]
        public IActionResult CheckIn(Attendance obj)
        {
            if (obj.EmployeeId == Guid.Empty || obj.Date > DateTime.Now || obj.CheckInTime > DateTime.Now)
            {
                return BadRequest("Invalid input data");
            }

            var existingAttendance = dBContext.Attendances.FirstOrDefault(a => a.EmployeeId == obj.EmployeeId && a.Date.Date == obj.Date.Date);

            if (existingAttendance == null)
            {
                var attendance = new Attendance
                {
                    AttendanceId = Guid.NewGuid(),
                    EmployeeId = obj.EmployeeId,
                    Date = obj.Date,
                    //CheckInTime= DateTime.Now,
                    CheckInTime = obj.CheckInTime,
                    CheckOutTime = null
                };

                dBContext.Attendances.Add(attendance);
            }
            else
            {
                return BadRequest("Employee has already checked in for the selected date.");
            }

            dBContext.SaveChanges();

            return Ok();
        }

        [HttpPost("checkout")]
        public IActionResult CheckOut(Guid employeeId, DateTime date)
        {
            if (employeeId == Guid.Empty || date > DateTime.Now)
            {
                return BadRequest("Invalid input data");
            }

            var existingAttendance = dBContext.Attendances.FirstOrDefault(a => a.EmployeeId == employeeId && a.Date.Date == date.Date);

            if (existingAttendance == null)
            {
                return BadRequest("No attendance record found for the given EmployeeId and Date");
            }

            if (existingAttendance.CheckInTime > date)
            {
                return BadRequest("Check-out time cannot be before check-in time.");
            }
            else
            {
                existingAttendance.CheckOutTime = DateTime.Now;
            }

            dBContext.SaveChanges();

            return Ok();
        }
    }
}