using EmployeeManagement.DataRepo;
using EmployeeAttendanceSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class HomeController : ControllerBase
    {
        private readonly AppDBContext dBContext;
        public HomeController(AppDBContext dBContext)
        {
             this.dBContext = dBContext;
        }

        [HttpGet("GetAllEmployees")]
        public IActionResult GetAllEmployees()
        {
            var employees = dBContext.Employees.ToList();

            return Ok(employees);
        }

        [HttpPost("AddEmployee")]
        public IActionResult AddEmployee(Employee request)
        {
            var employee = new Employee
            {
                EmployeeId = request.EmployeeId,
                Name = request.Name,
                Department = request.Department,
                Email = request.Email
            };

            dBContext.Employees.Add(employee);
            dBContext.SaveChanges();

            return Ok(employee);
        }

        [HttpPut("UpdateEmployee/{id}")]
        public IActionResult UpdateEmployee(Guid id, [FromBody] Employee request)
        {
            try
            {
                var existingEmployee = dBContext.Employees.FirstOrDefault(e => e.EmployeeId == id);

                if (existingEmployee == null)
                {
                    return NotFound($"Employee with ID {id} not found");
                }

                existingEmployee.Name = request.Name;
                existingEmployee.Department = request.Department;
                existingEmployee.Email = request.Email;

                dBContext.Employees.Update(existingEmployee);
                dBContext.SaveChanges();

                return Ok(existingEmployee);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteEmployee/{id}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            try
            {
                var employeeToDelete = dBContext.Employees.FirstOrDefault(e => e.EmployeeId == id);

                if (employeeToDelete == null)
                {
                    return NotFound($"Employee with ID {id} not found");
                }

                dBContext.Employees.Remove(employeeToDelete);
                dBContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }
    
    [HttpGet("GetReport")]
        public IActionResult GetReport()
        {
            var employees = dBContext.Employees.ToList();

            return Ok(employees);
        }
    }
}