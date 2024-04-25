import { TestBed } from '@angular/core/testing';

import { PosMasterService } from './pos-master.service';

describe('PosMasterService', () => {
  let service: PosMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
