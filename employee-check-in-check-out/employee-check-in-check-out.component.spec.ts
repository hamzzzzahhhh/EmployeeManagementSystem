import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckInCheckOutComponent } from './employee-check-in-check-out.component';

describe('EmployeeCheckInCheckOutComponent', () => {
  let component: EmployeeCheckInCheckOutComponent;
  let fixture: ComponentFixture<EmployeeCheckInCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCheckInCheckOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCheckInCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
