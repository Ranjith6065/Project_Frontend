import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterReportComponent } from './item-master-report.component';

describe('ItemMasterReportComponent', () => {
  let component: ItemMasterReportComponent;
  let fixture: ComponentFixture<ItemMasterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMasterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
