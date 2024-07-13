using System;
using Microsoft.EntityFrameworkCore;
using EmployeeAttendanceSystem.Models;

namespace EmployeeManagement.DataRepo
{
    public class AppDBContext : DbContext
    {
        public DbSet<Employee> Employees {  get; set; }
        public DbSet<Attendance> Attendances {  get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AttendanceConfiguration());

            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());


        }
    }

}
