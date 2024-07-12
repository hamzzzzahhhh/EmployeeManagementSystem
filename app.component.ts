
import { Component, OnInit } from '@angular/core';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeesdisplayComponent } from "./employeesdisplay/employeesdisplay.component";
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeCheckInCheckOutComponent } from "./employee-check-in-check-out/employee-check-in-check-out.component";

import { EmployeesdashboardComponent } from './employeesdashboard/employeesdashboard.component';

import { AttendnaceReportComponent } from './attendnace-report/attendnace-report.component';

import { CommonModule } from '@angular/common'; // Import CommonModule here
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, EmployeeListComponent, NgFor, EmployeesdisplayComponent,
    EmployeeCheckInCheckOutComponent, EmployeesdashboardComponent, AttendnaceReportComponent, CommonModule, HttpClientModule]
})

export class AppComponent implements OnInit {
  title = 'angular';
  selectedDate: string;

  constructor() {
    this.selectedDate = "";
  }

  ngOnInit() { }

  onSelectDate(): void {
    console.log('Selected date:', this.selectedDate);
  }
}