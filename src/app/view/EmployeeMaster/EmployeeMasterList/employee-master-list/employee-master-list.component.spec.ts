import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterListComponent } from './employee-master-list.component';

describe('EmployeeMasterListComponent', () => {
  let component: EmployeeMasterListComponent;
  let fixture: ComponentFixture<EmployeeMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
