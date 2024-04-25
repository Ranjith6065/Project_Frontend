import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomMasterEditComponent } from './uom-master-edit.component';

describe('UomMasterEditComponent', () => {
  let component: UomMasterEditComponent;
  let fixture: ComponentFixture<UomMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
