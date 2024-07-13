import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Employee } from '../Models/Employee.model';
import { FormsModule } from '@angular/forms';
import { Attendance } from './attendance.model';

@Component({
  selector: 'app-employeesdashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employeesdashboard.component.html',
  styleUrl: './employeesdashboard.component.css'
})
export class EmployeesdashboardComponent implements OnInit, OnChanges {
  employees: Employee[] = [];
  attendanceData: Attendance[] = [];
  selectedDate: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.getAttendanceData();
    }
  }

  getAttendanceData(): void {
    let url = 'https://localhost:7070/api/Attendance/getattendancedashboard';
    if (this.selectedDate) {
      url += `?selectedDate=${this.selectedDate.toString()}`;
    }
    this.http.get<Attendance[]>(url)
      .subscribe({
        next: (response: Attendance[]) => {
          this.attendanceData = response;
        },
        error: (error: any) => {
          console.error('Error fetching attendance data', error);
        }
      });
  }
}