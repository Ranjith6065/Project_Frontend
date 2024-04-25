import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxMasterEditComponent } from './tax-master-edit.component';

describe('TaxMasterEditComponent', () => {
  let component: TaxMasterEditComponent;
  let fixture: ComponentFixture<TaxMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
