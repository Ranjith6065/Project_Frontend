import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterEditComponent } from './employee-master-edit.component';

describe('EmployeeMasterEditComponent', () => {
  let component: EmployeeMasterEditComponent;
  let fixture: ComponentFixture<EmployeeMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
