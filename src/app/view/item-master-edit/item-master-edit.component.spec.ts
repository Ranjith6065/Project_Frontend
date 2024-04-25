import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterEditComponent } from './item-master-edit.component';

describe('ItemMasterEditComponent', () => {
  let component: ItemMasterEditComponent;
  let fixture: ComponentFixture<ItemMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
