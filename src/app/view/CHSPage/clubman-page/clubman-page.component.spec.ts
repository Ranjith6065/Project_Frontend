import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubmanPageComponent } from './clubman-page.component';

describe('ClubmanPageComponent', () => {
  let component: ClubmanPageComponent;
  let fixture: ComponentFixture<ClubmanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubmanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubmanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
