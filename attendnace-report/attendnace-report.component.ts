import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Attendance } from '../attendnace-report/attendance.model';

import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendnace-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendnace-report.component.html',
  styleUrl: './attendnace-report.component.css'
})
export class AttendnaceReportComponent {
  startDate: string = "";
  endDate: string = "";
  department: string = "";
  attendanceData: Attendance[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private http: HttpClient) { }

  getAttendanceData(): void {
    const url = `https://localhost:7070/api/Attendance/getattendancereports?startDate=${this.startDate}&endDate=${this.endDate}&department=${this.department}`;
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
