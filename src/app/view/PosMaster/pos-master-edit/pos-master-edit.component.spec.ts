import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMasterEditComponent } from './pos-master-edit.component';

describe('PosMasterEditComponent', () => {
  let component: PosMasterEditComponent;
  let fixture: ComponentFixture<PosMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
