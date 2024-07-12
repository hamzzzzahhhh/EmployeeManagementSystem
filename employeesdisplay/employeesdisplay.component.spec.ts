import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesdisplayComponent } from './employeesdisplay.component';

describe('EmployeesdisplayComponent', () => {
  let component: EmployeesdisplayComponent;
  let fixture: ComponentFixture<EmployeesdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
