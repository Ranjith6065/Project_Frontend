import { TestBed } from '@angular/core/testing';

import { UomMasterService } from './uom-master.service';

describe('UomMasterService', () => {
  let service: UomMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
