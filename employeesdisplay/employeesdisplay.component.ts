// employeesdisplay.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/Employee.model';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employeesdisplay',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employeesdisplay.component.html',
  styleUrls: ['./employeesdisplay.component.css']
})

export class EmployeesdisplayComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get<Employee[]>('https://localhost:7070/api/Home/GetAllEmployees')
      .subscribe(response => {
        this.employees = response;
      });
  }

  onEditEmployee(employee: Employee) {

  }

  onDeleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      const url = `https://localhost:7070/api/Home/DeleteEmployee/${employee.employeeId}`;
      this.http.delete(url)
        .subscribe({
          next: () => {
            console.log(`Employee ${employee.name} deleted successfully`);
            this.fetchEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
    }
  }
}