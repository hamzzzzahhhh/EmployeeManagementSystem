import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, HttpClientModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void { }

  public employeeForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    department: new FormControl<string>(''),
    email: new FormControl<string>(''),
  })

  onFormSubmit() {

    const addEmployeeRequest = {
      employeeId: this.employeeForm.value.id,
      name: this.employeeForm.value.name,
      department: this.employeeForm.value.department,
      email: this.employeeForm.value.email,
    }

    this.http.post('https://localhost:7070/api/Home/AddEmployee', addEmployeeRequest).subscribe(
      {
        next: (value: any) => {
          console.log("Test")
          console.log(value)
        }
      });
  }

  onEditEmployee(): void {
    const employeeId = this.employeeForm.value.id;

    const updateEmployeeRequest = {
      name: this.employeeForm.value.name,
      department: this.employeeForm.value.department,
      email: this.employeeForm.value.email
    };

    console.log('UpdateEmployeeRequest:', updateEmployeeRequest);

    this.http.put(`https://localhost:7070/api/Home/UpdateEmployee/${employeeId}`, updateEmployeeRequest)
      .subscribe({
        next: (response: any) => {
          console.log('Employee updated successfully:', response);
        },
        error: (error: any) => {
          console.error('Error updating employee:', error);
        }
      });
  }

}
