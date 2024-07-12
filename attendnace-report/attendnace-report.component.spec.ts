import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendnaceReportComponent } from './attendnace-report.component';

describe('AttendnaceReportComponent', () => {
  let component: AttendnaceReportComponent;
  let fixture: ComponentFixture<AttendnaceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendnaceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendnaceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
