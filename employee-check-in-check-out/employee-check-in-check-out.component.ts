import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../Models/Employee.model';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Attendance } from '../Models/Attendance.model';

@Component({
  selector: 'app-employee-check-in-check-out',
  standalone: true,
  imports: [NgFor, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './employee-check-in-check-out.component.html',
  styleUrl: './employee-check-in-check-out.component.css'
})

export class EmployeeCheckInCheckOutComponent {
  employees: Employee[] = [];
  attendances: Attendance[] = [];
  id: string = "";
  selectedEmployee: Employee | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Employee[]>('https://localhost:7070/api/Home/GetAllEmployees')
      .subscribe(response => {
        this.employees = response;
        console.log(this.employees);
      });
  }

  CheckIn() {
    if (this.selectedEmployee) {
      console.log(this.selectedEmployee.employeeId);

      const attendanceobject: Attendance = {

        employeeId: this.selectedEmployee.employeeId,
        date: new Date().toISOString(),
        checkInTime: new Date().toISOString(),
        // checkInTime: undefined,
        checkOutTime: undefined
      }

      console.log(attendanceobject);

      this.http.post('https://localhost:7070/api/Attendance/checkin', attendanceobject)
        .subscribe(response => {
          console.log(response);
        });
    } else {
      console.log('No employee selected');
    }
  }

  CheckOut() {
    if (this.selectedEmployee) {
      const employeeId = this.selectedEmployee.employeeId;
      const date = new Date().toISOString().slice(0, 10);

      this.http.post(`https://localhost:7070/api/Attendance/checkout?employeeId=${employeeId}&date=${date}`, {})
        .subscribe({
          next: (response) => {
            console.log('Checkout successful:', response);
          },
          error: (error) => {
            console.error('Checkout error:', error);
          }
        });
    } else {
      console.log('No employee selected');
    }
  }
}